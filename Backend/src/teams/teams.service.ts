import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { TeamDTO } from "src/dto/TeamDTO";
import * as XLSX from 'xlsx';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) { }

  async createTeam(data: TeamDTO) {
    try {
      // Crea el team y espera la respuesta
      const team = await this.prisma.teamPPI.create({
        data,
      });

      // Crea el logbook y espera la respuesta
      const logbook = await this.prisma.logbook.create({
        data: {
          projectName: team.teamName,
          folderNumberId: team.id,
          description: "",
          detailedScope: "",
          firstMeetingScope: "",
          secondMeetingScope: "",
        },
      });

      // Devuelve una respuesta que incluya información tanto del team como del logbook
      return { team, logbook };
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la creación del team o del logbook
      throw new Error('Failed to create team and logbook: ' + error.message);
    }
  }

  async processXlsx(fileBuffer: any) {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const errors = [];

    for (const row of sheet) {
      try {
        const teamDTO: TeamDTO = {
          folderNumber: row['folderNumber'],
          teamName: row['teamName'],
          idCourse: row['idCourse'],
          idUser: row['idUser'],
        };

        if (!teamDTO.folderNumber || !teamDTO.teamName || !teamDTO.idCourse || !teamDTO.idUser) {
          throw new Error('Missing required fields');
        }

        // Validar que el correo electrónico termine con @elpoli.edu.co

        const existingTeam = await this.prisma.teamPPI.findFirst({
          where: { folderNumber: teamDTO.folderNumber },
        });

        if (existingTeam) {
          await this.updateTeam(existingTeam.id, teamDTO);
        } else {
          await this.createTeam(teamDTO);
        }
      } catch (error) {
        errors.push({ row, error: error.message });
      }
    }

    return { errors };
  }

  async findAllTeams() {
    return (await this.prisma.teamPPI.findMany())
  }

  async findAllTeamsFront() {
    const teams = await this.prisma.teamPPI.findMany();

    // `Promise.all` se utiliza para asegurar que todas las promesas se resuelvan antes de continuar
    const teamsWithDetails = await Promise.all(
      teams.map(async team => {
        // Realiza las consultas de forma concurrente
        const user = await this.prisma.user.findUnique({
          where: { id: team.idUser }
        });
        const course = await this.prisma.course.findUnique({
          where: { id: team.idCourse }
        });

        // Retorna un nuevo objeto combinando el equipo con sus detalles de usuario y curso
        return {
          ...team,
          idUser: `${user?.name} ${user?.lastName}`,
          idCourse: course?.courseName
        };
      })
    );

    return teamsWithDetails;
  }

  async findTeamById(folderNumberId: string) {
    return this.prisma.teamPPI.findUnique({
      where: { id: folderNumberId },
    });
  }

  async updateTeam(id: string, data: TeamDTO) {
    return this.prisma.teamPPI.update({
      where: { id },
      data,
    });
  }

  async deleteTeam(id: string) {
    return this.prisma.teamPPI.delete({
      where: { id },
    });
  }





}
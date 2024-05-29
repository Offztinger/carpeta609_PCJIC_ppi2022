import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { TeamMembersDTO } from "src/dto/TeamDTO";


@Injectable()
export class TeamMemberService {
  constructor(private prisma: PrismaService) { }

  // async getStudentsFromTeam(id: string) {
  //   return this.prisma.teamMembers.findMany({
  //     where: { folderNumberId: id },
  //   });
  // }

  async getStudentsFromTeam(id: string) {
    const teamMembers = await this.prisma.teamMembers.findMany({
      where: { folderNumberId: id },
    });

    // Utiliza Promise.all para esperar a que todas las promesas en el arreglo se resuelvan
    const teamMemberWithDetails = await Promise.all(
      teamMembers.map(async (member) => {
        const student = await this.prisma.user.findUnique({
          where: { id: member.idUser },
        });

        if (!student) {
          throw new Error(`User not found for idUser ${member.idUser}`);
        }

        // Desestructura el objeto y omite la propiedad idUser
        const { idUser, ...rest } = member;

        return { ...rest, student };  // Retorna el objeto sin la propiedad idUser, incluyendo los detalles del estudiante
      })
    );

    return teamMemberWithDetails;
  }

  async updateTeamMembers(members: TeamMembersDTO[]) {
    for (const member of members) {
      await this.prisma.teamMembers.update({
        where: { id: member.id },
        data: member,
      });
    }
    return members;
  }

  async deleteTeamMembers(id: string) {
    return this.prisma.teamMembers.delete({
      where: { id },
    });
  }


  async addStudentToTeam(members: TeamMembersDTO[]) {
    for (const member of members) {
      await this.prisma.teamMembers.create({
        data: member,
      });
    }
    return members;
  }
}
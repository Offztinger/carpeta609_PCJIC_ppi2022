import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { TeamDTO, TeamMembersDTO } from "src/dto/TeamDTO";


@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) { }

  async createTeam(data: TeamDTO) {
    return this.prisma.teamPPI.create({
      data,
    });
  }

  async findAllTeams() {
    return (await this.prisma.teamPPI.findMany())
  }

  async findTeamById(id: string) {
    return this.prisma.teamPPI.findUnique({
      where: { id },
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

  async addStudentToTeam(members: TeamMembersDTO[]) {
    for (const member of members) {
      await this.prisma.teamMembers.create({
        data: member,
      });
    }
    return members;
  }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { UserDTO } from "src/dto/UserDTO";
import { Roles } from "src/roles/constants/roles.constants";
import { hashPassword } from "src/utils";


@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) { }

  async createProfessor(data: UserDTO) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAllProfessors() {
    return this.prisma.user.findMany({
      where: {
        role: {
          roleName: "Profesor",
        }
      },
    });
  }

  async findProfessorById(id: string) {

    const professorById = await this.prisma.user.findFirst({
      where: { id, role: { roleName: Roles.PROFESSOR }, }
    });

    if (!professorById) {
      throw new NotFoundException("No hay ningun estudiante con ese id");
    }
    return professorById;


  }

  async updateProfessor(id: string, data: UserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: hashPassword(data.password),
      },
    });
  }

  async deleteProfessor(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
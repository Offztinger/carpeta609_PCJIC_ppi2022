import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { UserDTO } from "src/dto/UserDTO";
import { Roles } from "src/roles/constants/roles.constants";
import { hashPassword } from "src/utils";


@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) { }

  async createProfessor(data: UserDTO) {
    try {
      return await this.prisma.user.create(
        {
          data: {
            ...data,
            password: hashPassword(data.password),
          },
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllProfessors() {
    return this.prisma.user.findMany({
      where: {
        Role: {
          roleName: "Profesor",
        }
      },
    });
  }

  async findProfessorById(id: string) {

    const professorById = await this.prisma.user.findFirst({
      where: { id, Role: { roleName: Roles.PROFESSOR }, }
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
        password: data.password ? hashPassword(data.password) : undefined,
      },
    });
  }

  async deleteProfessor(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
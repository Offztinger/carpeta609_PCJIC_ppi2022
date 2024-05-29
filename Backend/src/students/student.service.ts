import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { UserDTO } from "src/dto/UserDTO";
import { Roles } from "src/roles/constants/roles.constants";
import { hashPassword } from "src/utils";
import { UndefinedException } from "src/utils/exceptions/UndefinedException";


@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) { }

  async createStudent(data: UserDTO) {
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

  async findAllStudents() {
    return this.prisma.user.findMany({
      where: {
        Role: {
          roleName: "Estudiante",
        }
      },
    });
  }

  async findStudentById(id: string) {

    const studentById = await this.prisma.user.findFirst({
      where: { id, Role: { roleName: Roles.STUDENT }, }
    });

    if (!studentById) {
      throw new NotFoundException("No hay ningun estudiante con ese id");
    }

    return studentById;
  }

  async updateStudent(id: string, data: UserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: data.password ? hashPassword(data.password) : undefined,
      },
    });
  }

  async deleteStudent(id: string) {

    if (id === undefined) {
      throw new UndefinedException();
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
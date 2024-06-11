import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { UserDTO } from "src/dto/UserDTO";
import { Roles } from "src/roles/constants/roles.constants";
import { hashPassword } from "src/utils";
import { UndefinedException } from "src/utils/exceptions/UndefinedException";
import * as XLSX from 'xlsx';
@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) { }

  async processXlsx(fileBuffer: any) {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const errors = [];

    for (const row of sheet) {
      try {
        const userDTO: UserDTO = {
          documentNumber: row['documentNumber'],
          email: row['email'],
          password: row['password'] ? row['password'] : `C.c${row['documentNumber']}`,
          name: row['name'],
          lastName: row['lastName'],
          idRole: row['idRole'],
        };

        if (!userDTO.documentNumber || !userDTO.email || !userDTO.name || !userDTO.lastName || !userDTO.idRole) {
          throw new Error('Missing required fields');
        }

        // Validar que el correo electrónico termine con @elpoli.edu.co
        if (!userDTO.email.includes('@elpoli.edu.co')) {
          throw new Error('Invalid email domain. It should be @elpoli.edu.co');
        }

        const existingUser = await this.prisma.user.findFirst({
          where: { documentNumber: userDTO.documentNumber },
        });

        if (existingUser) {
          await this.updateStudent(existingUser.id, userDTO);
        } else {
          await this.createStudent(userDTO);
        }
      } catch (error) {
        errors.push({ row, error: error.message });
      }
    }

    return { errors };
  }


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
        password: data.password ? hashPassword(data.password) : hashPassword(`C.c${data.documentNumber}`),
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
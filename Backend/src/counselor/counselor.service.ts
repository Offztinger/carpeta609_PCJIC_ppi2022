import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { UserDTO } from "src/dto/UserDTO";
import { Roles } from "src/roles/constants/roles.constants";
import { hashPassword } from "src/utils";

@Injectable()
export class CounselorService {
  constructor(private prisma: PrismaService) { }

  async createCounselor(data: UserDTO) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAllCounselors() {
    return this.prisma.user.findMany({
      where: {
        role: {
          roleName: "Asesor",
        }
      },
    });
  }

  async findCounselorById(id: string) {

    const counselorById = await this.prisma.user.findFirst({
      where: { id, role: { roleName: Roles.COUNSELOR }, }
    });

    if (!counselorById) {
      throw new NotFoundException("No hay ningun estudiante con ese id");
    }

    return counselorById;

  }

  async updateCounselor(id: string, data: UserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: hashPassword(data.password),
      },
    });
  }

  async deleteCounselor(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
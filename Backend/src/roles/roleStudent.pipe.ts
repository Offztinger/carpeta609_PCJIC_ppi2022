import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class RoleStudentPipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: value.idUser,
            },
        });

        const userRole = user?.idRole == '3284495c-136e-4215-b8cc-30e6d9ca52b0'

        if (!userRole) {
            throw new BadRequestException(`El usuario al que quieres relacionar no existe`);
        }

        return value;
    }
}


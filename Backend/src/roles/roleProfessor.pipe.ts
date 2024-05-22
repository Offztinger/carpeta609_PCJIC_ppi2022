import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class RoleProfessorPipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: value.idUser,
            },
        });

        const userRole = user?.idRole == '1164b212-c28e-4f5c-a886-36795031cbf3'

        if (!userRole) {
            throw new BadRequestException(`El usuario al que quieres relacionar no existe`);
        }

        return value;
    }
}


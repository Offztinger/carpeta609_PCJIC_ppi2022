import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class UserPipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: value.idUser,
            },
        });

        if (!user) {
            throw new BadRequestException(`El usuario al que quieres relacionar no existe`);
        }

        return value;
    }
}


import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class TeamPipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const team = await this.prisma.teamPPI.findFirst({
            where: {
                id: value.folderNumberId,
            },
        });

        if (!team) {
            throw new BadRequestException(`El usuario al que quieres relacionar no existe`);
        }

        return value;
    }
}


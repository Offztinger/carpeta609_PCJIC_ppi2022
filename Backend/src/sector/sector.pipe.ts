import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class SectorPipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const sector = await this.prisma.sector.findFirst({
            where: {
                id: value.id,
            },
        });

        if (!sector) {
            throw new BadRequestException(`El sector al que quieres relacionar no existe`);
        }

        return value;
    }
}


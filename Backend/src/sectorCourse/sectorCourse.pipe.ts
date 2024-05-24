import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class SectorCoursePipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const sectorCourse = await this.prisma.sectorCourse.findFirst({
            where: {
                idSectorCourse: value.idSectorCourse,
            },
        });

        if (!sectorCourse) {
            throw new BadRequestException(`El sector al que quieres relacionar no existe`);
        }

        return value;
    }
}


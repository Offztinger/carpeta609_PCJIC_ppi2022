import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";

@Injectable()
export class LogbookPipe implements PipeTransform {
    constructor(private prisma: PrismaService) { }

    async transform(value: any) {
        const logbook = await this.prisma.logbook.findFirst({
            where: {
                id: value.logbookId,
            },
        });

        if (!logbook) {
            throw new BadRequestException(`El usuario al que quieres relacionar no existe`);
        }

        return value;
    }
}


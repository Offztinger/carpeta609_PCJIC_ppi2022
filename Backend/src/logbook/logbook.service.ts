import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { LogbookDTO } from "src/dto/LogbookDTO";
@Injectable()
export class LogbookService {
    constructor(private prisma: PrismaService) { }

    async createLogbook(data: LogbookDTO) {
        return this.prisma.logbook.create({
            data,
        });
    }

    async findAllLogbooks() {
        return (await this.prisma.logbook.findMany())
    }

    async findLogbookById(folderNumberId: string) {
        return await this.prisma.logbook.findUnique({
            where: { folderNumberId },
        });
    }

    async updateLogbook(id: string, data: LogbookDTO) {
        return this.prisma.logbook.update({
            where: { id },
            data,
        });
    }

    async deleteLogbook(id: string) {
        return this.prisma.logbook.delete({
            where: { id },
        });
    }

}

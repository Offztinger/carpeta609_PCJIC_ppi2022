import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { LogbookDetailDTO } from "src/dto/LogbookDetailDTO";


@Injectable()
export class LogbookDetailService {
    constructor(private prisma: PrismaService) { }

    async createLogbookDetail(data: LogbookDetailDTO) {
        return this.prisma.logbookDetail.create({
            data,
        });
    }

    async findAllLogbookDetails() {
        return (await this.prisma.logbookDetail.findMany())
    }

    async findLogbookDetailById(id: string) {
        return await this.prisma.logbookDetail.findUnique({
            where: { id },
        });
    }

    async updateLogbookDetail(id: string, data: LogbookDetailDTO) {
        return this.prisma.logbookDetail.update({
            where: { id },
            data,
        });
    }

    async deleteLogbookDetail(id: string) {
        return this.prisma.logbookDetail.delete({
            where: { id },
        });
    }

}

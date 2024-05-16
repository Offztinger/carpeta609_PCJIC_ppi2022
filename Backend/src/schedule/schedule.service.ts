import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { ScheduleDTO } from "src/dto/ScheduleDTO";


@Injectable()
export class ScheduleService {
    constructor(private prisma: PrismaService) { }

    async createSchedule(data: ScheduleDTO) {
        return this.prisma.schedule.create({
            data,
        });
    }

    async findAllSchedules() {
        return (await this.prisma.schedule.findMany())
    }

    async findScheduleById(id: string) {
        return await this.prisma.schedule.findUnique({
            where: { id },
        });
    }

    async updateSchedule(id: string, data: ScheduleDTO) {
        return this.prisma.schedule.update({
            where: { id },
            data,
        });
    }

    async deleteSchedule(id: string) {
        return this.prisma.schedule.delete({
            where: { id },
        });
    }

}

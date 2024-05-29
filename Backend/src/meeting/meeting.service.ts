import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { MeetingDTO } from "src/dto/MeetingDTO";


@Injectable()
export class MeetingService {
    constructor(private prisma: PrismaService) { }

    async createMeeting(data: MeetingDTO) {
        return this.prisma.meeting.create({
            data,
        });
    }

    async findAllMeetings() {
        return (await this.prisma.meeting.findMany())
    }

    async findMeetingById(id: string) {
        return await this.prisma.meeting.findUnique({
            where: { id },
        });
    }

    async updateMeeting(id: string, data: MeetingDTO) {
        return this.prisma.meeting.update({
            where: { id },
            data,
        });
    }

    async deleteMeeting(id: string) {
        return this.prisma.meeting.delete({
            where: { id },
        });
    }

}

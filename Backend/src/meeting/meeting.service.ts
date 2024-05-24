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

    async findMeetingById(idMeeting: string) {
        return await this.prisma.meeting.findUnique({
            where: { idMeeting },
        });
    }

    async updateMeeting(idMeeting: string, data: MeetingDTO) {
        return this.prisma.meeting.update({
            where: { idMeeting },
            data,
        });
    }

    async deleteMeeting(idMeeting: string) {
        return this.prisma.meeting.delete({
            where: { idMeeting },
        });
    }

}

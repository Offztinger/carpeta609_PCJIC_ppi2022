import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CourseUserDTO } from "src/dto/CourseDTO";


@Injectable()
export class CourseUserService {
    constructor(private prisma: PrismaService) { }

    async createCourseUser(data: CourseUserDTO) {
        return this.prisma.courseUser.create({
            data,
        });
    }

    async findAllCourseUsers() {
        return (await this.prisma.courseUser.findMany())
    }

    async findCourseUserById(idCourseUser: string) {
        return await this.prisma.courseUser.findUnique({
            where: { idCourseUser },
        });
    }

    async updateCourseUser(idCourseUser: string, data: CourseUserDTO) {
        return this.prisma.courseUser.update({
            where: { idCourseUser },
            data,
        });
    }

    async deleteCourseUser(idCourseUser: string) {
        return this.prisma.courseUser.delete({
            where: { idCourseUser },
        });
    }

}
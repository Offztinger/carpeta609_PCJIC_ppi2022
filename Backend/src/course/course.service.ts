import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CourseDTO } from "src/dto/CourseDTO";


@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) { }

    async createCourse(data: CourseDTO) {
        return this.prisma.course.create({
            data,
        });
    }

    async findAllCourses() {
        return (await this.prisma.course.findMany())
    }

    async findCourseById(id: string) {
        return await this.prisma.course.findUnique({
            where: { id },
        });
    }

    async updateCourse(id: string, data: CourseDTO) {
        return this.prisma.course.update({
            where: { id },
            data,
        });
    }

    async deleteCourse(id: string) {
        return this.prisma.course.delete({
            where: { id },
        });
    }

}

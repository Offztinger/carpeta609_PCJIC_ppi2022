import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CourseStudentDTO } from "src/dto/CourseDTO";


@Injectable()
export class CourseStudentService {
    constructor(private prisma: PrismaService) { }

    async createCourseStudent(data: CourseStudentDTO) {
        return this.prisma.courseStudent.create({
            data,
        });
    }

    async findAllCourseStudents() {
        return (await this.prisma.courseStudent.findMany())
    }

    async findCourseStudentById(idCourseStudent: string) {
        return await this.prisma.courseStudent.findUnique({
            where: { idCourseStudent },
        });
    }

    async updateCourseStudent(idCourseStudent: string, data: CourseStudentDTO) {
        return this.prisma.courseStudent.update({
            where: { idCourseStudent },
            data,
        });
    }

    async deleteCourseStudent(idCourseStudent: string) {
        return this.prisma.courseStudent.delete({
            where: { idCourseStudent },
        });
    }

}

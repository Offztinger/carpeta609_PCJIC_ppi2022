import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { CourseProfessorDTO } from "src/dto/CourseDTO";


@Injectable()
export class CourseProfessorService {
    constructor(private prisma: PrismaService) { }

    async createCourseProfessor(data: CourseProfessorDTO) {
        return this.prisma.courseProfessor.create({
            data,
        });
    }

    async findAllCourseProfessors() {
        return (await this.prisma.courseProfessor.findMany())
    }

    async findCourseProfessorById(idCourseProfessor: string) {
        return await this.prisma.courseProfessor.findUnique({
            where: { idCourseProfessor },
        });
    }

    async updateCourseProfessor(idCourseProfessor: string, data: CourseProfessorDTO) {
        return this.prisma.courseProfessor.update({
            where: { idCourseProfessor },
            data,
        });
    }

    async deleteCourseProfessor(idCourseProfessor: string) {
        return this.prisma.courseProfessor.delete({
            where: { idCourseProfessor },
        });
    }

}

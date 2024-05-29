import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { SectorCourseDTO } from "src/dto/SectorDTO";


@Injectable()
export class SectorCourseService {
    constructor(private prisma: PrismaService) { }

    async createSectorCourse(data: SectorCourseDTO) {
        return this.prisma.sectorCourse.create({
            data,
        });
    }

    async findAllSectorCourses() {
        return (await this.prisma.sectorCourse.findMany())
    }

    async findSectorCoursesByIdCourse(idCourse: string) {
        try {
            const sectorCourses = await this.prisma.sectorCourse.findMany({
                where: { idCourse },
                include: {
                    Sector: true,
                    Course: true,
                },
            });

            if (sectorCourses.length === 0) {
                throw new Error(`No sector courses found with idCourse ${idCourse}`);
            }

            // Transformar los resultados para incluir solo las propiedades deseadas
            const transformedResults = sectorCourses.map(sectorCourse => ({
                id: sectorCourse.id,
                sectorName: sectorCourse.Sector.sectorName,
                courseName: sectorCourse.Course.courseName,
                sectorObjectiveCourse: sectorCourse.sectorObjectiveCourse,
            }));

            return transformedResults;
        } catch (error) {
            console.error(`Failed to find sector courses by idCourse: ${error.message}`);
            throw error;
        }
    }

    async findSectorCourseById(id: string) {
        return this.prisma.sectorCourse.findUnique({
            where: { id },
        });
    }

    async updateSectorCourse(id: string, data: SectorCourseDTO) {
        return this.prisma.sectorCourse.update({
            where: { id },
            data,
        });
    }

    async deleteSectorCourse(id: string) {
        return this.prisma.sectorCourse.delete({
            where: { id },
        });
    }

}

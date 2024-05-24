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

    async findSectorCourseById(idSectorCourse: string) {
        return await this.prisma.sectorCourse.findUnique({
            where: { idSectorCourse },
        });
    }

    async updateSectorCourse(idSectorCourse: string, data: SectorCourseDTO) {
        return this.prisma.sectorCourse.update({
            where: { idSectorCourse },
            data,
        });
    }

    async deleteSectorCourse(idSectorCourse: string) {
        return this.prisma.sectorCourse.delete({
            where: { idSectorCourse },
        });
    }

}

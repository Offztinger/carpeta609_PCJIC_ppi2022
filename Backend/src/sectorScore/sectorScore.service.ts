import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { SectorScoreDTO } from "src/dto/SectorDTO";


@Injectable()
export class SectorScoreService {
    constructor(private prisma: PrismaService) { }

    async createSectorScore(data: SectorScoreDTO) {
        return this.prisma.sectorScore.create({
            data,
        });
    }

    async findAllSectorScores() {
        return (await this.prisma.sectorScore.findMany())
    }

    async findSectorScoreById(id: string) {
        return await this.prisma.sectorScore.findUnique({
            where: { id },
        });
    }

    async updateSectorScore(id: string, data: SectorScoreDTO) {
        return this.prisma.sectorScore.update({
            where: { id },
            data,
        });
    }

    async deleteSectorScore(id: string) {
        return this.prisma.sectorScore.delete({
            where: { id },
        });
    }

}

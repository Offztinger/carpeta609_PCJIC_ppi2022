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

    async findSectorScoreById(idSectorScore: string) {
        return await this.prisma.sectorScore.findUnique({
            where: { idSectorScore },
        });
    }

    async updateSectorScore(idSectorScore: string, data: SectorScoreDTO) {
        return this.prisma.sectorScore.update({
            where: { idSectorScore },
            data,
        });
    }

    async deleteSectorScore(idSectorScore: string) {
        return this.prisma.sectorScore.delete({
            where: { idSectorScore },
        });
    }

}

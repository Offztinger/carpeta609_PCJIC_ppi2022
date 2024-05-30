import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { SectorScoreDTO } from "src/dto/SectorDTO";


@Injectable()
export class SectorScoreService {
    constructor(private prisma: PrismaService) { }

    async createSectorScore(data: SectorScoreDTO) {
        try {
            return await this.prisma.sectorScore.create({
                data: {
                    idSectorCourse: data.idSectorCourse,
                    scoreSector: data.scoreSector,
                    folderNumberId: data.folderNumberId,
                    idUser: data.idUser,
                },
            });
        } catch (error) {
            // Handle any potential errors here
            console.error("Error creating sector score:", error);
            throw new Error("Failed to create sector score.");
        }
    }

    async findAllSectorScores() {
        try {
            const sectorScores = await this.prisma.sectorScore.findMany();

            const results = await Promise.all(sectorScores.map(async (sectorScore) => {
                const [student, folderNumber, sectorCourse] = await Promise.all([
                    this.prisma.user.findUnique({
                        where: { id: sectorScore.idUser },
                    }),
                    this.prisma.user.findUnique({
                        where: { id: sectorScore.folderNumberId },
                    }),
                    this.prisma.sectorCourse.findUnique({
                        where: { id: sectorScore.idSectorCourse },
                    }),
                ]);

                return {
                    sectorScore,
                    student,
                    folderNumber,
                    sectorCourse,
                };
            }));

            return results;
        } catch (error) {
            // Handle any potential errors here
            console.error("Error fetching sector scores:", error);
            throw new Error("Failed to fetch sector scores.");
        }
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

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { SectorDTO } from "src/dto/SectorDTO";


@Injectable()
export class SectorService {
    constructor(private prisma: PrismaService) { }

    async createSector(data: SectorDTO) {
        return this.prisma.sector.create({
            data,
        });
    }

    async findAllSectors() {
        return (await this.prisma.sector.findMany())
    }

    async findSectorById(id: string) {
        return await this.prisma.sector.findUnique({
            where: { id },
        });
    }

    async updateSector(id: string, data: SectorDTO) {
        return this.prisma.sector.update({
            where: { id },
            data,
        });
    }

    async deleteSector(id: string) {
        return this.prisma.sector.delete({
            where: { id },
        });
    }

}

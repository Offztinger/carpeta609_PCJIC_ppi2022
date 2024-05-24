import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { SectorService } from './sector.service';
import { ApiTags } from '@nestjs/swagger';
import { SectorDTO } from 'src/dto/SectorDTO';


@ApiTags('Sector')
@Controller('sector')
export class SectorController {
    constructor(private readonly sectorService: SectorService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createSector(@Body() sectorData: SectorDTO) {
        return this.sectorService.createSector(sectorData);
    }

    @Get()
    findAllSectors() {
        return this.sectorService.findAllSectors();
    }

    @Get(':idSector')
    findSectorById(@Param('idSector') idSector: string) {
        return this.sectorService.findSectorById(idSector);
    }

    @Put(':idSector')
    updateSector(@Param('idSector') idSector: string, @Body() sectorData: SectorDTO) {
        return this.sectorService.updateSector(idSector, sectorData);
    }

    @Delete(':idSector')
    deleteSector(@Param('idSector') idSector: string) {
        return this.sectorService.deleteSector(idSector);
    }
}
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { SectorScoreService } from './sectorScore.service';
import { ApiTags } from '@nestjs/swagger';
import { SectorScoreDTO } from 'src/dto/SectorDTO';
import { SectorPipe } from 'src/sector/sector.pipe';
import { SectorCoursePipe } from 'src/sectorCourse/sectorCourse.pipe';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';
import { UserPipe } from 'src/user/user.pipe';


@ApiTags('SectorScore')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('sectorScore')
export class SectorScoreController {
    constructor(private readonly sectorScoreService: SectorScoreService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createSectorScore(@Body(SectorPipe, SectorCoursePipe, UserPipe) sectorScoreData: SectorScoreDTO) {
        return this.sectorScoreService.createSectorScore(sectorScoreData);
    }

    @Get()
    findAllSectorScores() {
        return this.sectorScoreService.findAllSectorScores();
    }

    @Get(':folderNumberId')
    findSectorScoreById(@Param('folderNumberId') folderNumberId: string) {
        return this.sectorScoreService.findSectorScoreByFolderId(folderNumberId);
    }

    @Put(':idSectorScore')
    updateSectorScore(@Param('idSectorScore') idSectorScore: string, @Body() sectorScoreData: SectorScoreDTO) {
        return this.sectorScoreService.updateSectorScore(idSectorScore, sectorScoreData);
    }

    @Delete(':idSectorScore')
    deleteSectorScore(@Param('idSectorScore') idSectorScore: string) {
        return this.sectorScoreService.deleteSectorScore(idSectorScore);
    }
}
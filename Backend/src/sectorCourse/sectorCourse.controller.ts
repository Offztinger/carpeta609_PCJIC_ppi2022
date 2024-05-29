import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { SectorCourseService } from './sectorCourse.service';
import { ApiTags } from '@nestjs/swagger';
import { SectorCourseDTO } from 'src/dto/SectorDTO';
import { CoursePipe } from 'src/course/course.pipe';
import { SectorPipe } from 'src/sector/sector.pipe';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';


@ApiTags('SectorCourse')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('sectorCourse')
export class SectorCourseController {
    constructor(private readonly sectorCourseService: SectorCourseService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createSectorCourse(@Body(SectorPipe, CoursePipe) sectorCourseData: SectorCourseDTO) {
        return this.sectorCourseService.createSectorCourse(sectorCourseData);
    }

    @Get()
    findAllSectorCourses() {
        return this.sectorCourseService.findAllSectorCourses();
    }

    @Get('course/:idCourse')
    findSectorCourseByIdCourse(@Param('idCourse') idCourse: string) {
        return this.sectorCourseService.findSectorCoursesByIdCourse(idCourse);
    }

    @Get(':id')
    findSectorCourseById(@Param('id') id: string) {
        return this.sectorCourseService.findSectorCourseById(id);
    }

    @Put(':idSectorCourse')
    updateSectorCourse(@Param('idSectorCourse') idSectorCourse: string, @Body() sectorCourseData: SectorCourseDTO) {
        return this.sectorCourseService.updateSectorCourse(idSectorCourse, sectorCourseData);
    }

    @Delete(':idSectorCourse')
    deleteSectorCourse(@Param('idSectorCourse') idSectorCourse: string) {
        return this.sectorCourseService.deleteSectorCourse(idSectorCourse);
    }
}
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { SectorCourseService } from './sectorCourse.service';
import { ApiTags } from '@nestjs/swagger';
import { SectorCourseDTO } from 'src/dto/SectorDTO';
import { CoursePipe } from 'src/course/course.pipe';
import { SectorPipe } from 'src/sector/sector.pipe';


@ApiTags('SectorCourse')
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

    @Get(':idSectorCourse')
    findSectorCourseById(@Param('idSectorCourse') idSectorCourse: string) {
        return this.sectorCourseService.findSectorCourseById(idSectorCourse);
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
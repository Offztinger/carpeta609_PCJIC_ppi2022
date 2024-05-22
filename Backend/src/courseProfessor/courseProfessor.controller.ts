import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { CourseProfessorService } from './courseProfessor.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseProfessorDTO } from 'src/dto/CourseDTO';

@ApiTags('CourseProfessor')
@Controller('courseProfessor')
export class CourseProfessorController {
    constructor(private readonly courseProfessorService: CourseProfessorService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCourseProfessor(@Body() courseProfessorData: CourseProfessorDTO) {
        return this.courseProfessorService.createCourseProfessor(courseProfessorData);
    }

    @Get()
    findAllCourseProfessors() {
        return this.courseProfessorService.findAllCourseProfessors();
    }

    @Get(':id')
    findCourseProfessorById(@Param('id') id: string) {
        return this.courseProfessorService.findCourseProfessorById(id);
    }

    @Put(':id')
    updateCourseProfessor(@Param('id') id: string, @Body() courseProfessorData: CourseProfessorDTO) {
        return this.courseProfessorService.updateCourseProfessor(id, courseProfessorData);
    }

    @Delete(':id')
    deleteCourseProfessor(@Param('id') id: string) {
        return this.courseProfessorService.deleteCourseProfessor(id);
    }
}
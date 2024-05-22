import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { CourseStudentService } from './courseStudent.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseStudentDTO } from 'src/dto/CourseDTO';

@ApiTags('CourseStudent')
@Controller('courseStudent')
export class CourseStudentController {
    constructor(private readonly courseStudentService: CourseStudentService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCourseStudent(@Body() courseStudentData: CourseStudentDTO) {
        return this.courseStudentService.createCourseStudent(courseStudentData);
    }

    @Get()
    findAllCourseStudents() {
        return this.courseStudentService.findAllCourseStudents();
    }

    @Get(':id')
    findCourseStudentById(@Param('id') id: string) {
        return this.courseStudentService.findCourseStudentById(id);
    }

    @Put(':id')
    updateCourseStudent(@Param('id') id: string, @Body() courseStudentData: CourseStudentDTO) {
        return this.courseStudentService.updateCourseStudent(id, courseStudentData);
    }

    @Delete(':id')
    deleteCourseStudent(@Param('id') id: string) {
        return this.courseStudentService.deleteCourseStudent(id);
    }
}
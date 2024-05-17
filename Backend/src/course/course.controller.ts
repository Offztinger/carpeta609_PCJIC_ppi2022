import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseDTO } from 'src/dto/CourseDTO';

@ApiTags('Course')
@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCourse(@Body() courseData: CourseDTO) {
        return this.courseService.createCourse(courseData);
    }

    @Get()
    findAllCourses() {
        return this.courseService.findAllCourses();
    }

    @Get(':id')
    findCourseById(@Param('id') id: string) {
        return this.courseService.findCourseById(id);
    }

    @Put(':id')
    updateCourse(@Param('id') id: string, @Body() courseData: CourseDTO) {
        return this.courseService.updateCourse(id, courseData);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
}
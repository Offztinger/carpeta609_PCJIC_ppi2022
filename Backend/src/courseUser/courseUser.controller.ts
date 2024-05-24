import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { CourseUserService } from './courseUser.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseUserDTO } from 'src/dto/CourseDTO';
import { CoursePipe } from 'src/course/course.pipe';
import { UserPipe } from 'src/user/user.pipe';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';

@ApiTags('CourseUser')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('courseUser')
export class CourseUserController {
    constructor(private readonly courseUserService: CourseUserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCourseUser(@Body(CoursePipe, UserPipe) courseUserData: CourseUserDTO) {
        return this.courseUserService.createCourseUser(courseUserData);
    }

    @Get()
    findAllCourseUsers() {
        return this.courseUserService.findAllCourseUsers();
    }

    @Get(':id')
    findCourseUserById(@Param('id') id: string) {
        return this.courseUserService.findCourseUserById(id);
    }

    @Put(':id')
    updateCourseUser(@Param('id') id: string, @Body() courseUserData: CourseUserDTO) {
        return this.courseUserService.updateCourseUser(id, courseUserData);
    }

    @Delete(':id')
    deleteCourseUser(@Param('id') id: string) {
        return this.courseUserService.deleteCourseUser(id);
    }
}
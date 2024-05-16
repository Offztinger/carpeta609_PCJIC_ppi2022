import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { StudentService } from './student.service';
import { UserDTO } from 'src/dto/UserDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createStudent(@Body() studentData: UserDTO) {
    return this.studentService.createStudent(studentData);
  }

  @Get()
  findAllStudents() {
    return this.studentService.findAllStudents();
  }

  @Get(':id')
  findStudentById(@Param('id') id: string) {
    return this.studentService.findStudentById(id);
  }

  @Put(':id')
  updateStudent(@Param('id') id: string, @Body() studentData: UserDTO) {
    return this.studentService.updateStudent(id, studentData);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
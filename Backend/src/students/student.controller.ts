import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { UserDTO } from 'src/dto/UserDTO';
import { ApiTags } from '@nestjs/swagger';
import { RolePipe } from 'src/roles/role.pipe';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';
import { UserPipe } from 'src/user/user.pipe';
import { UserDocumentPipe } from 'src/user/userDocument.pipe';

@ApiTags('Student')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createStudent(@Body(RolePipe, UserPipe, UserDocumentPipe) studentData: UserDTO) {
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
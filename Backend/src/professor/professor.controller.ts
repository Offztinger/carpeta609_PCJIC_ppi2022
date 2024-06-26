import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { UserDTO } from 'src/dto/UserDTO';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';
import { UserDocumentPipe } from 'src/user/userDocument.pipe';
import { RolePipe } from 'src/roles/role.pipe';

@ApiTags('Professor')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProfessor(@Body(RolePipe, UserDocumentPipe) professorData: UserDTO) {
    return this.professorService.createProfessor(professorData);
  }

  @Get()
  findAllProfessors() {
    return this.professorService.findAllProfessors();
  }

  @Get(':id')
  findProfessorById(@Param('id') id: string) {
    return this.professorService.findProfessorById(id);
  }

  @Put(':id')
  updateProfessor(@Param('id') id: string, @Body() professorData: UserDTO) {
    return this.professorService.updateProfessor(id, professorData);
  }

  @Delete(':id')
  deleteProfessor(@Param('id') id: string) {
    return this.professorService.deleteProfessor(id);
  }
}
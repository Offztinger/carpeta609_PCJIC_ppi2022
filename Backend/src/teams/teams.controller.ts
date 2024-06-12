import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDTO } from 'src/dto/TeamDTO';
import { ApiTags } from '@nestjs/swagger';
import { CoursePipe } from 'src/course/course.pipe';
import { RoleProfessorPipe } from 'src/roles/roleProfessor.pipe';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Teams')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    const result = await this.teamsService.processXlsx(file.buffer);
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTeam(@Body(CoursePipe, RoleProfessorPipe) teamData: TeamDTO) {
    return this.teamsService.createTeam(teamData);
  }

  @Get()
  findAllTeams() {
    return this.teamsService.findAllTeams();
  }

  @Get("front")
  findAllTeamsFront() {
    return this.teamsService.findAllTeamsFront();
  }

  @Get(':folderNumberId')
  findTeamById(@Param('folderNumberId') folderNumberId: string) {
    return this.teamsService.findTeamById(folderNumberId);
  }

  @Put(':id')
  updateTeam(@Param('id') id: string, @Body() teamData: TeamDTO) {
    return this.teamsService.updateTeam(id, teamData);
  }

  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    return this.teamsService.deleteTeam(id);
  }
}
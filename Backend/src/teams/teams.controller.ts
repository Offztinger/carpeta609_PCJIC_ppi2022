import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDTO, TeamMembersDTO } from 'src/dto/TeamDTO';
import { ApiTags } from '@nestjs/swagger';
import { CoursePipe } from 'src/course/course.pipe';
import { TeamPipe } from './team.pipe';
import { RoleProfessorPipe } from 'src/roles/roleProfessor.pipe';
import { RoleStudentPipe } from 'src/roles/roleStudent.pipe';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTeam(@Body(CoursePipe, RoleProfessorPipe) teamData: TeamDTO) {
    return this.teamsService.createTeam(teamData);
  }

  @Post("team-members")
  @HttpCode(HttpStatus.CREATED)
  addStudentsToTeam(@Body(TeamPipe, CoursePipe, RoleStudentPipe) teamMembers: TeamMembersDTO[]) {
    return this.teamsService.addStudentToTeam(teamMembers);
  }

  @Get()
  findAllTeams() {
    return this.teamsService.findAllTeams();
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
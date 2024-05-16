import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDTO, TeamMembersDTO } from 'src/dto/TeamDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTeam(@Body() teamData: TeamDTO) {
    return this.teamsService.createTeam(teamData);
  }

  @Post("team-members")
  @HttpCode(HttpStatus.CREATED)
  addStudentsToTeam(@Body() teamMembers: TeamMembersDTO[]) {
    return this.teamsService.addStudentToTeam(teamMembers);
  }

  @Get()
  findAllTeams() {
    return this.teamsService.findAllTeams();
  }

  @Get(':id')
  findTeamById(@Param('id') id: string) {
    return this.teamsService.findTeamById(id);
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
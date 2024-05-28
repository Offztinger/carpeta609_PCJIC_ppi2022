import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, UseGuards, Put, Delete } from '@nestjs/common';
import { TeamMemberService } from './teamMember.service';
import { TeamMembersDTO } from 'src/dto/TeamDTO';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';
import { TeamPipe } from 'src/teams/team.pipe';

@ApiTags('Team Member')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('teamMember')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addStudentsToTeam(@Body(TeamPipe) teamMembers: TeamMembersDTO[]) {
    return this.teamMemberService.addStudentToTeam(teamMembers);
  }

  @Get(':folderNumberId')
  findAllTeamMembers(@Param('folderNumberId') folderNumberId: string) {
    return this.teamMemberService.getStudentsFromTeam(folderNumberId);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updateTeamMembers(@Body() teamMembers: TeamMembersDTO[]) {
    return this.teamMemberService.updateTeamMembers(teamMembers);
  }

  @Delete(':idTeamMember')
  @HttpCode(HttpStatus.OK)
  deleteTeamMembers(@Param('idTeamMember') idTeamMember: string) {
    return this.teamMemberService.deleteTeamMembers(idTeamMember);
  }

}
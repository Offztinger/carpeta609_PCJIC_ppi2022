import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { ApiTags } from '@nestjs/swagger';
import { MeetingDTO } from 'src/dto/MeetingDTO';
import { RoleProfessorPipe } from 'src/roles/roleProfessor.pipe';
import { TeamPipe } from 'src/teams/team.pipe';

@ApiTags('Meeting')
@Controller('meeting')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createMeeting(@Body(TeamPipe, RoleProfessorPipe) meetingData: MeetingDTO) {
        return this.meetingService.createMeeting(meetingData);
    }

    @Get()
    findAllMeetings() {
        return this.meetingService.findAllMeetings();
    }

    @Get(':idMeeting')
    findMeetingById(@Param('idMeeting') idMeeting: string) {
        return this.meetingService.findMeetingById(idMeeting);
    }

    @Put(':idMeeting')
    updateMeeting(@Param('idMeeting') idMeeting: string, @Body() meetingData: MeetingDTO) {
        return this.meetingService.updateMeeting(idMeeting, meetingData);
    }

    @Delete(':idMeeting')
    deleteMeeting(@Param('idMeeting') idMeeting: string) {
        return this.meetingService.deleteMeeting(idMeeting);
    }
}
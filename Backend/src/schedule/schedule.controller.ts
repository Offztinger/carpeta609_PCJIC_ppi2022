import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags } from '@nestjs/swagger';
import { ScheduleDTO } from 'src/dto/ScheduleDTO';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createSchedule(@Body() scheduleData: ScheduleDTO) {
        return this.scheduleService.createSchedule(scheduleData);
    }

    @Get()
    findAllSchedules() {
        return this.scheduleService.findAllSchedules();
    }

    @Get(':id')
    findScheduleById(@Param('id') id: string) {
        return this.scheduleService.findScheduleById(id);
    }

    @Put(':id')
    updateSchedule(@Param('id') id: string, @Body() scheduleData: ScheduleDTO) {
        return this.scheduleService.updateSchedule(id, scheduleData);
    }

    @Delete(':id')
    deleteSchedule(@Param('id') id: string) {
        return this.scheduleService.deleteSchedule(id);
    }
}
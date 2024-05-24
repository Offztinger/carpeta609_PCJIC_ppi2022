import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { LogbookDetailService } from './logbookDetail.service';
import { ApiTags } from '@nestjs/swagger';
import { LogbookDetailDTO } from 'src/dto/LogbookDetailDTO';
import { LogbookPipe } from 'src/logbook/logbook.pipe';
import { RoleProfessorPipe } from 'src/roles/roleProfessor.pipe';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';

@ApiTags('LogbookDetail')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('logbookDetail')
export class LogbookDetailController {
    constructor(private readonly logbookDetailService: LogbookDetailService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createLogbookDetail(@Body(LogbookPipe, RoleProfessorPipe) logbookDetailData: LogbookDetailDTO) {
        return this.logbookDetailService.createLogbookDetail(logbookDetailData);
    }

    @Get()
    findAllLogbookDetails() {
        return this.logbookDetailService.findAllLogbookDetails();
    }

    @Get(':id')
    findLogbookDetailById(@Param('id') id: string) {
        return this.logbookDetailService.findLogbookDetailById(id);
    }

    @Put(':id')
    updateLogbookDetail(@Param('id') id: string, @Body() logbookDetailData: LogbookDetailDTO) {
        return this.logbookDetailService.updateLogbookDetail(id, logbookDetailData);
    }

    @Delete(':id')
    deleteLogbookDetail(@Param('id') id: string) {
        return this.logbookDetailService.deleteLogbookDetail(id);
    }
}
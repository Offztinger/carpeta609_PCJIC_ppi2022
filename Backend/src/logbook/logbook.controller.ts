import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { LogbookService } from './logbook.service';
import { ApiTags } from '@nestjs/swagger';
import { LogbookDTO } from 'src/dto/LogbookDTO';
import { TeamPipe } from 'src/teams/team.pipe';
import { AuthGuard, JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Logbook')
@UseGuards(JwtAuthGuard, AuthGuard)
@Controller('logbook')
export class LogbookController {
    constructor(private readonly logbookService: LogbookService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createLogbook(@Body(TeamPipe) logbookData: LogbookDTO) {
        return this.logbookService.createLogbook(logbookData);
    }

    @Get()
    findAllLogbooks() {
        return this.logbookService.findAllLogbooks();
    }

    @Get(':folderNumberId')
    findLogbookById(@Param('folderNumberId') folderNumberId: string) {
        return this.logbookService.findLogbookById(folderNumberId);
    }

    @Put(':id')
    updateLogbook(@Param('id') id: string, @Body() logbookData: LogbookDTO) {
        return this.logbookService.updateLogbook(id, logbookData);
    }

    @Delete(':id')
    deleteLogbook(@Param('id') id: string) {
        return this.logbookService.deleteLogbook(id);
    }
}
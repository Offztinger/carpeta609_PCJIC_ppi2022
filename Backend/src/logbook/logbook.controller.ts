import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { LogbookService } from './logbook.service';
import { ApiTags } from '@nestjs/swagger';
import { LogbookDTO } from 'src/dto/LogbookDTO';

@ApiTags('Logbook')
@Controller('logbook')
export class LogbookController {
    constructor(private readonly logbookService: LogbookService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createLogbook(@Body() logbookData: LogbookDTO) {
        return this.logbookService.createLogbook(logbookData);
    }

    @Get()
    findAllLogbooks() {
        return this.logbookService.findAllLogbooks();
    }

    @Get(':folderNumber')
    findLogbookById(@Param('folderNumber') folderNumber: string) {
        return this.logbookService.findLogbookById(folderNumber);
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
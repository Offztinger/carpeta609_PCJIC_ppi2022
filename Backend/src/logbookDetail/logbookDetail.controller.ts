import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { LogbookDetailService } from './logbookDetail.service';
import { ApiTags } from '@nestjs/swagger';
import { LogbookDetailDTO } from 'src/dto/LogbookDetailDTO';

@ApiTags('LogbookDetail')
@Controller('logbookDetail')
export class LogbookDetailController {
    constructor(private readonly logbookDetailService: LogbookDetailService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createLogbookDetail(@Body() logbookDetailData: LogbookDetailDTO) {
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
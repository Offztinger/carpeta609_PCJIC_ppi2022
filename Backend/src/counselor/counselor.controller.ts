import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { UserDTO } from 'src/dto/UserDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Counselor')
@Controller('counselor')
export class CounselorController {
  constructor(private readonly counselorService: CounselorService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCounselor(@Body() counselorData: UserDTO) {
    return this.counselorService.createCounselor(counselorData);
  }

  @Get()
  findAllCounselors() {
    return this.counselorService.findAllCounselors();
  }

  @Get(':id')
  findCounselorById(@Param('id') id: string) {
    return this.counselorService.findCounselorById(id);
  }

  @Put(':id')
  updateCounselor(@Param('id') id: string, @Body() counselorData: UserDTO) {
    return this.counselorService.updateCounselor(id, counselorData);
  }

  @Delete(':id')
  deleteCounselor(@Param('id') id: string) {
    return this.counselorService.deleteCounselor(id);
  }
}
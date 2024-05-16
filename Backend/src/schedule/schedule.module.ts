import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
})
export class ScheduleModule { }
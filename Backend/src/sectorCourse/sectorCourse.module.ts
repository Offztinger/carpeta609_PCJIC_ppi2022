import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { SectorCourseController } from './sectorCourse.controller';
import { SectorCourseService } from './sectorCourse.service';

@Module({
  controllers: [SectorCourseController],
  providers: [SectorCourseService, PrismaService],
})
export class SectorCourseModule { }
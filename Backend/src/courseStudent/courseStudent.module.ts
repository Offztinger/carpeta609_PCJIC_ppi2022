import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CourseStudentController } from './courseStudent.controller';
import { CourseStudentService } from './courseStudent.service';

@Module({
  controllers: [CourseStudentController],
  providers: [CourseStudentService, PrismaService],
})
export class CourseStudentModule { }
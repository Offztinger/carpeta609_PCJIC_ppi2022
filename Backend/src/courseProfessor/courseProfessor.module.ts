import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CourseProfessorController } from './courseProfessor.controller';
import { CourseProfessorService } from './courseProfessor.service';

@Module({
  controllers: [CourseProfessorController],
  providers: [CourseProfessorService, PrismaService],
})
export class CourseProfessorModule { }
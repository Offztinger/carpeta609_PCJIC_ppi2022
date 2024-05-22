import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { CourseUserController } from './courseUser.controller';
import { CourseUserService } from './courseUser.service';

@Module({
  controllers: [CourseUserController],
  providers: [CourseUserService, PrismaService],
})
export class CourseUserModule { }
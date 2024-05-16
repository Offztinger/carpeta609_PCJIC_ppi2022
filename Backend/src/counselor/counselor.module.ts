import { Module } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CounselorController } from './counselor.controller';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Module({
  controllers: [CounselorController],
  providers: [CounselorService, PrismaService],
})
export class CounselorModule { }
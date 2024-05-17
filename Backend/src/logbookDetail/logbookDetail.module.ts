import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { LogbookDetailController } from './logbookDetail.controller';
import { LogbookDetailService } from './logbookDetail.service';

@Module({
  controllers: [LogbookDetailController],
  providers: [LogbookDetailService, PrismaService],
})
export class LogbookDetailModule { }
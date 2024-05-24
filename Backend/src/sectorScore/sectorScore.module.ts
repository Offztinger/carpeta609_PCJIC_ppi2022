import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { SectorScoreController } from './sectorScore.controller';
import { SectorScoreService } from './sectorScore.service';

@Module({
  controllers: [SectorScoreController],
  providers: [SectorScoreService, PrismaService],
})
export class SectorScoreModule { }
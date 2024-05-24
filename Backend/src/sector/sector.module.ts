import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';

@Module({
  controllers: [SectorController],
  providers: [SectorService, PrismaService],
})
export class SectorModule { }
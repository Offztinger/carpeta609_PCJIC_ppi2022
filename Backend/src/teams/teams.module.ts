import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService],
})
export class TeamsModule { }
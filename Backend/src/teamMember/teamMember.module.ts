import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { TeamMemberController } from './teamMember.controller';
import { TeamMemberService } from './teamMember.service';

@Module({
  controllers: [TeamMemberController],
  providers: [TeamMemberService, PrismaService],
})
export class TeamMemberModule { }
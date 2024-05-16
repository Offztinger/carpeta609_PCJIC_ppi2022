import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './core/database/prisma/prisma.service';
import { configRoot } from './core/config/configurations';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { StudentModule } from './students/student.module';
import { TeamsModule } from './teams/teams.module';
import { ProfessorModule } from './professor/professor.module';
import { CounselorModule } from './counselor/counselor.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(configRoot()), DatabaseModule, StudentModule, TeamsModule, ProfessorModule, CounselorModule, ScheduleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

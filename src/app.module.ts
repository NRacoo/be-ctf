import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ChallengesService } from './challenges/challenges.service';
import { ChallengesModule } from './challenges/challenges.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [ UserModule, DatabaseModule, AuthModule, AdminModule, ChallengesModule, LeaderboardModule],
  controllers: [AppController],
  providers: [AppService, ChallengesService],
})
export class AppModule {}

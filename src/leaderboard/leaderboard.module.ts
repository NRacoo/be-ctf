import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [LeaderboardController],
  imports:[UserModule]
})
export class LeaderboardModule {}

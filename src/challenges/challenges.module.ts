import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { DatabaseService } from '../database/database.service';
import { UserModule } from '../user/user.module';

@Module({
  imports:[UserModule],
  controllers: [ChallengesController],
  providers:[ChallengesService, DatabaseService],
})
export class ChallengesModule {}

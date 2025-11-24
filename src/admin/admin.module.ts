import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DatabaseModule } from '../database/database.module';
import { AdminController } from './admin.controller';

@Module({
  imports:[DatabaseModule],
  providers: [AdminService],
  exports:[AdminService],
  controllers: [AdminController]
})
export class AdminModule {}

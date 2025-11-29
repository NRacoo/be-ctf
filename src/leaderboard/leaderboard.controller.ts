import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private userService: UserService){}

    @Get()
    async getLeaderboard(){
        return this.userService.LeaderBoard()
    }
}

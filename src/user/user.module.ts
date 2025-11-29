import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./user.controller";
import { GatewayModule } from "../gateway/gateway.module";
import { LeaderboardGateway } from "../gateway/leaderboard.gateway";

@Module({
    imports:[DatabaseModule, GatewayModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})

export class UserModule{}
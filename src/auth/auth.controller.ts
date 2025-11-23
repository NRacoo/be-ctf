import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "../dto/user-dto";
import { Prisma } from "@prisma/client";
import { AuthGuard } from "./auth.guard";


@Controller("auth")

export class AuthController{
    constructor(private authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() data:UserDto){
          return this.authService.login(data)  
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }
}
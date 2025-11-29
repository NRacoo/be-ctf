import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "../user/dto/user-dto";
import { AuthGuard } from "./auth.guard";
import { AdminDto } from "../admin/dto/admin-dto";
import { AdminGuard } from "./admin.guard";


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
    getProfile(@Request() req:any){
        return req.user
    }

    @HttpCode(HttpStatus.OK)
    @Post('admin/login')
    loginAdmin(@Body() data:AdminDto){
        return this.authService.adminLogin(data)
    }

    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.OK)
    @Get('admin/profile')
    getProfileAdmin(@Request() req:any){
        return req.admin
    }
}
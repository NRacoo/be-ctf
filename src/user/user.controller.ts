
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user-dto";

@Controller("users")
export class UserController{
    constructor(private readonly userService: UserService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    async create(@Body() body:UserDto){
        return this.userService.CreateUser(body)
    }

    @HttpCode(HttpStatus.OK)
    @Get("leaderboard")
    async findAll(){
        return this.userService.LeaderBoard()
    }

    @HttpCode(HttpStatus.OK)
    @Get("user")
    async findByUsername(@Query("username") username:string){
        return this.userService.GetUserByUsername(username)
    }
    @HttpCode(HttpStatus.OK)
    @Get()
    async getUser(){
        return this.userService.GetAllUser()
    }

    
}


import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "../dto/user-dto";

@Controller("users")
export class UserController{
    constructor(private readonly userService: UserService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    async create(@Body() body:UserDto){
        return this.userService.CreateUser(body)
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(){
        return this.userService.GetAllUser()
    }
}
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AdminDto } from './dto/admin-dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly service:AdminService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAdmin(@Query("username") username : string){
        return this.service.findAdmin(username)
    }
}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { AuthGuard } from '../auth/auth.guard';
import { SubmitFlagDTO } from './dto/submitFlag.dto';
import { AdminGuard } from '../auth/admin.guard';
import { ChallengeDTO } from './dto/challenge-dto';

@Controller('challenges')
export class ChallengesController {
    constructor(private service:ChallengesService){}

    @HttpCode(HttpStatus.OK)
    @Get("/")
    async getChall(){
        try {
            return this.service.getChall()
            
        } catch (error) {
            throw new Error(error)
        }
    }


    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post("submit")
    async submitFlag(@Req() req:any, @Body() dto:SubmitFlagDTO){
            console.log("DTO: ", dto)
            console.log("user: ", req.user)
            const userId = req.user.id;
            return this.service.submitFlag(userId, dto)
            
        
    }

    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post("admin/create")
    async createChall( @Body() dto:ChallengeDTO){
        try {
            return this.service.create(dto)
            
        } catch (error) {
            throw new Error(error)
        }
    }

    @UseGuards(AdminGuard)
    @HttpCode(HttpStatus.OK)
    @Delete("admin/delete")
    async deleteChall(@Query("id") id:string){
        try {
            return this.service.deleteById(id)
            
        } catch (error) {
            throw new Error(error)
        }
    }
}

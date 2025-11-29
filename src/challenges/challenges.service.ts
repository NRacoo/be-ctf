import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { SubmitFlagDTO } from './dto/submitFlag.dto';
import { ChallengeDTO } from './dto/challenge-dto';
import * as bcrypt from "bcrypt"
import { UserService } from '../user/user.service';

@Injectable()
export class ChallengesService {
    constructor(
        private prisma:DatabaseService,
        private userService:UserService
    ){}

    async submitFlag (userId: string, dto:SubmitFlagDTO){
        const { challengeId, flag } = dto
        
        const challenge = await this.prisma.challenge.findUnique(
            {
                where: {id : challengeId}
            }
        )

        if(!challenge){
            throw new BadRequestException("Challenge Tidak ditemukan")
        }

        const isCorrect = await bcrypt.compare(flag, challenge.flag)
        if(!isCorrect){
            throw new BadRequestException("flag salah.")
        }

        const alreadySolve = await this.prisma.solve.findUnique(

            {
                where:{ userId_challengeId: {userId, challengeId}}
            }
        )
        
        if(alreadySolve){
            throw new BadRequestException("challenge already solve")
        }

        await this.prisma.solve.create({
            data:{
                userId, challengeId
            }
        })

        await this.prisma.user.update(
            {
                where: {id: userId},
                data:{
                    score:{increment: challenge.points},
                    lastSolve: new Date(),
                }
            }
        )

        await this.userService.LeaderBoard()

        return { message: "Flag benar", points: challenge.points}
    }

    async create(dto:ChallengeDTO){
        const {title, description, flag, points} = dto

        const challenge = await this.prisma.challenge.findUnique(
            {
                where:{title : title}
            }
        )
        if(challenge){
            throw new BadRequestException("challenge sudah tersedia")
        }

        const hashFlag = await bcrypt.hash(flag, 10)

        const result = await this.prisma.challenge.create(
            {
                data:{
                    title:title,
                    description:description,
                    flag:hashFlag,
                    points:points
                }
            }
        )

        const data = { title : result.title, description: result.description, points: result.points}
        return {message: "challenge berhasil dibuat", data}
    }

    async getById(id : string){
        return this.prisma.challenge.findUnique(
            {
                where:{id: id}
            } 
        )
    }

    async deleteById( id : string ){
        const res = await this.prisma.challenge.delete(
            {
                where: { id : id}
            }
        )
        return {message:"challenge berhasil terhapus", data:res}
    }

    async getChall(){
        const res = await this.prisma.challenge.findMany()
        return { message : "berhasil", data:res}
    }
}
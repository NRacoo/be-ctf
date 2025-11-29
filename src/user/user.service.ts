import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDto } from "src/user/dto/user-dto";
import * as bcrypt from "bcrypt"
import { DatabaseService } from "../database/database.service";
import { LeaderboardGateway } from "../gateway/leaderboard.gateway";

@Injectable()

export class UserService{
    constructor(
        private  prisma : DatabaseService,
        private  gateway: LeaderboardGateway
    ) {}

    async FindUser(username :string){
        if(!username)throw new BadRequestException("user harus diisi")
        return this.prisma.user.findUnique({
            where:{username}
        })
    }
    async CreateUser(data : UserDto){
        const { username, password } = data
        if(!username ||  !password) {
            throw new BadRequestException("username dan password wajib diisi");
        }

        const existing = await this.prisma.user.findUnique({
            where:{username}
        })
        if(existing){
            throw new BadRequestException("user telah terdaftar");
            
        }
        const hash = await bcrypt.hash(password, 10)

        return this.prisma.user.create({
            data:{
                username,
                password:hash,
                role:"user"
            }
        });
    }
    async GetAllUser(){
        const result = await this.prisma.user.findMany({
            select:{
                id:true,
                username:true,
                score:true,
                lastSolve:true,
                createdAt:true
            }
        })
        return { message: "berhasil" , data:result}
    }
    async GetUserByUsername(username:string){
        const result = await this.prisma.user.findUnique(
            {
                where: { username : username}
            }
        )
        return {message:"berhasil", data:result}
    }
    async LeaderBoard(){
        const data = await this.prisma.user.findMany(
            {
                select:{ id : true, username: true, score: true, lastSolve:true, solves:{select:{createdAt: true}}},
                orderBy:[
                    {score : 'desc'},
                ]
            }
        )
         const leaderboard = data.map((u, index) => ({
            id: u.id,
            username: u.username,
            score: u.score,
            solves: u.solves.length,
            lastSolve: u.solves.length > 0 
            ? u.solves[u.solves.length - 1].createdAt 
            : null,
            rank: index + 1,
        }))
        this.gateway.broadcastLeaderboard(leaderboard)
        return leaderboard
    }
}
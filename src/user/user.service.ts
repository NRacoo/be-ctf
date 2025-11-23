import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDto } from "src/dto/user-dto";
import * as bcrypt from "bcrypt"
import { DatabaseService } from "../database/database.service";

@Injectable()

export class UserService{
    constructor(private  prisma : DatabaseService) {}

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
        return this.prisma.user.findMany({
            select:{
                id:true,
                username:true,
                score:true,
                lastSolve:true,
                createdAt:true
            }
        })
    }
}
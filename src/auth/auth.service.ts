import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../dto/user-dto";
import * as bcrypt from "bcrypt"


@Injectable()

export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService : JwtService
    ){}
    async login(data : UserDto) : Promise<{access_token : string, message: string, result:any}>{
       const {username, password} = data
       const user = await this.userService.FindUser(username)

       if(!user) throw new BadRequestException("user tidak ditemukan")

       const isMatched = await bcrypt.compare(password, user.password);
       if (!isMatched) throw new BadRequestException("password salah");

       const payload = {id: user.id, username: user.username, role:user.role}
       const access_token = await this.jwtService.signAsync(payload)
       return { message: "login berhasil",  result:payload, access_token }
    }
}
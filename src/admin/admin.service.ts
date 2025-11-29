import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AdminDto } from './dto/admin-dto';

@Injectable()
export class AdminService {
    constructor(private prisma:DatabaseService){}

    async findAdmin(username : string){
        console.log("user: ", username)
         if(!username){
                    throw new BadRequestException("user tidak ditemukan")
        }
        return this.prisma.admin.findUnique(
            {
                where: { username }

            }
        )
    }
    
}

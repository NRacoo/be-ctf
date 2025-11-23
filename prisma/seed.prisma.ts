import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { DatabaseService } from "src/database/database.service";
import * as bcrypt from "bcrypt"


async function main(){
    const appcontext = await NestFactory.createApplicationContext(AppModule)
    const db = appcontext.get(DatabaseService)

    try {
        const username = process.env.ADMIN
        const rawPassword = process.env.PASSWORD
        if(!username || !rawPassword) throw new Error("Env tidak ada")
    
    
    
        const hashPassword = await bcrypt.hash(rawPassword, 10)
    
        const admin = await db.admin.create({
            data:{
                username:username,
                password:hashPassword,
            }
        })
        if(admin){
            console.log("seed admin success: ", admin)
        }
        
    } catch (error) {
        throw new Error(error)
    }finally{
        db.$disconnect()
    }
    

}

main()
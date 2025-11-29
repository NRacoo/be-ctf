import { IsInt, IsString } from "class-validator";


export class ChallengeDTO{
    @IsInt()
    id:string;

    @IsString()
    title:string;

    @IsString()
    description:string

    @IsString()
    flag:string

    @IsInt()
    points:number;
}
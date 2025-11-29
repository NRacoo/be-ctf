import { IsString } from "class-validator";


export class SubmitFlagDTO{
    @IsString()
    challengeId: string;

     @IsString()
    flag: string;
}
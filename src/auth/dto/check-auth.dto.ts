import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsString } from "class-validator";

export class CheckAuthDto {
    @IsString()
    @IsEmail()
    @IsEmpty()
    @ApiProperty()
    username: string;

    @IsString()
    @IsEmpty()
    @ApiProperty()
    password: string;
}
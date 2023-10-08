import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength, IsBoolean } from "class-validator";


export class CreateNoteDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Title must have atleast 2 characters.' })
    @MaxLength(40)
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'content must have atleast 2 characters.' })
    @MaxLength(9000)
    @ApiProperty()
    content: string;

    @IsBoolean()
    @ApiProperty()
    isShared: boolean;

}

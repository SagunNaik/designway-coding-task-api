import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsEmail, IsInt, IsString, IsEnum, Matches, MinLength } from "class-validator";
import { Role } from "src/utilities/roles.enum";

const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'First name must have atleast 2 characters.' })
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Last name must have atleast 2 characters.' })
    @ApiProperty()
    lastName: string;

    @IsAlphanumeric(null, {
        message: 'Username does not allow other than alpha numeric chars.',
    })
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    @ApiProperty()
    email: string;

    @IsInt()
    @ApiProperty()
    age: number;

    @IsString()
    @IsEnum(['f', 'm', 'u'])
    @ApiProperty()
    gender: string;

    @IsString()
    @IsEnum(Role)
    @ApiProperty()
    role: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
    })
    @ApiProperty()
    password: string;
}

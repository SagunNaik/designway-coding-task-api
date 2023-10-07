import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckAuthDto } from './dto/check-auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';
import { routeConstant } from 'src/utilities/constant';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

const { AUTH } = routeConstant;

@ApiTags(AUTH)
@Controller(AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: CheckAuthDto })
  verify(@Req() req: Request, @Body() userCread: CheckAuthDto) {

    return req?.user;
  }

  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  signup(@Body() userCreateDto: CreateUserDto) {
    return this.authService.signup(userCreateDto)
  }
}

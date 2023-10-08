import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { IUserPayload } from 'src/users/interfaces/user-payload.interface';
import { UsersService } from 'src/users/users.service';
import { jwtConstant } from 'src/utilities/constant';
import { isMatched } from 'src/utilities/helper';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { };

  async validateUser(email: string, password: string) {

    const user = await this.userService.findUserByEmailORUserName(email);

    if (!user) throw new NotFoundException("User not found!!");

    if (!await isMatched(password, user?.password)) throw new NotFoundException("Password does not match!!");

    return await this.login(user);
  }

  async login(user: User) {

    const payload: IUserPayload = {
      email: user?.email,
      userId: user?.id,
      username: user?.username,
      fullName: `${user?.firstName} ${user?.lastName}`,
      firstName: user?.firstName,
      lastName: user?.lastName,
      role: user?.role
    };

    const token = this.jwtService.sign(payload);

    return { cm_token: token };

  }

  public async getUserFromAuthToken(jwtToken: string) {

    const payload: IUserPayload = this.jwtService.verify(jwtToken, {
      secret: jwtConstant.secret
    })

    if (payload?.email) {
      return payload;
    }

  }

  async signup(userCreateDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(userCreateDto)
  }
}

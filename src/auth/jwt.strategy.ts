import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstant } from '../utilities/constant'
import { updateUser } from './decorator/user.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: any) {
    //updateUser(payload);
    return {
      email: payload?.email,
      userId: payload?.userId,
      username: payload?.username,
      fullName: payload?.fullName,
      firstName: payload?.firstName,
      lastName: payload?.lastName,
      role: payload?.role
    }
  }
}
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) token = req.cookies['jwt'];
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  async validate(payload: any) {
    return {
      _id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}

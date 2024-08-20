import { PassportStrategy } from '@nestjs/passport';
import { users } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwt_constants } from 'src/Constants';
import { Property_To_String } from 'src/util/types';

export class JWT_Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt_constants.secret,
    });
  }

  async validate(payload: Property_To_String<users, 'id'>) {
    return payload;
  }
}

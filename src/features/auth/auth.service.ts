import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserBusiness } from 'src/business/user.business';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/IUser';
import { ITokenPayload } from 'src/interfaces/ITokenPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userBusiness: UserBusiness,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async (email: string, password: string) => {
    const user: IUser = await this.userBusiness.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  };

  login = (user: IUser) => {
    const payload: ITokenPayload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  };
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/interfaces/IConfig';
import { RoleBusiness } from 'src/business/role.business';
import { Role } from 'src/schemas/role.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService<IConfig>,
    private readonly roleBusiness: RoleBusiness,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const role: Role = await this.roleBusiness.getById(payload.role);
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      roleName: role.name,
    };
  }
}

import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { loginDto } from 'src/models/login.dto';
import { UserBusiness } from 'src/business/user.business';
import { CreateUserDto } from 'src/models/create-user.dto';
import { ObjectId } from 'mongodb';
import { IResponse } from 'src/interfaces/IResponse';

@ApiTags('Authendication')
@Controller('auth')
@ApiExtraModels(loginDto, CreateUserDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userBusiness: UserBusiness,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ schema: { $ref: getSchemaPath(loginDto) } })
  async login(@Request() req) {
    const login = this.authService.login(req.user);

    return <IResponse<{ access_token: string }>>{
      error: false,
      data: login,
    };
  }

  @Post('register')
  @ApiBody({ schema: { $ref: getSchemaPath(CreateUserDto) } })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userBusiness.create({
      ...createUserDto,
      role: new ObjectId(createUserDto.role),
    });

    return <IResponse<string>>{
      error: false,
      data: 'User created sucessfully.',
    };
  }
}

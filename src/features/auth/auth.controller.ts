import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { loginDto } from 'src/models/login.dto';

@ApiTags('Authendication')
@Controller('auth')
@ApiExtraModels(loginDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ schema: { $ref: getSchemaPath(loginDto) } })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

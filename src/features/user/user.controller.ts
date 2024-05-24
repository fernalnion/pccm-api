import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserBusiness } from 'src/business/user.business';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateUserDto, updateDto } from 'src/models/user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiExtraModels(CreateUserDto, updateDto)
export class UserController {
  constructor(private readonly userBusiness: UserBusiness) {}

  @Post()
  @ApiBody({ schema: { $ref: getSchemaPath(CreateUserDto) } })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userBusiness.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.userBusiness.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userBusiness.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userBusiness.deleteById(id);
    return;
  }

  @Put(':id')
  @ApiBody({ schema: { $ref: getSchemaPath(updateDto) } })
  async update(
    @Param('id') id: string,
    @Body() updatePayload: Partial<updateDto>,
  ) {
    await this.userBusiness.updateById(id, updatePayload);
  }
}
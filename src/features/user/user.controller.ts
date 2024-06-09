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
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/models/create-user.dto';
import { UpdateUserDto } from 'src/models/update-user.dto';
import { ObjectId } from 'mongodb';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiExtraModels(CreateUserDto, UpdateUserDto)
export class UserController {
  constructor(private readonly userBusiness: UserBusiness) {}

  @Post()
  @ApiBody({ schema: { $ref: getSchemaPath(CreateUserDto) } })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userBusiness.create({
      ...createUserDto,
      role: new ObjectId(createUserDto.role),
    });
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
  @ApiBody({ schema: { $ref: getSchemaPath(UpdateUserDto) } })
  async update(
    @Param('id') id: string,
    @Body() updatePayload: Partial<UpdateUserDto>,
  ) {
    await this.userBusiness.updateById(id, updatePayload);
  }
}

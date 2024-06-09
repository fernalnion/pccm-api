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
import { ApiTags } from '@nestjs/swagger';
import { RoleBusiness } from 'src/business/role.business';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IResponse } from 'src/interfaces/IResponse';
import { CreateRoleDto } from 'src/models/create-role.dto';
import { Role } from 'src/schemas/role.schema';

@ApiTags('Role')
@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleBusiness: RoleBusiness) {}

  @Post()
  async createRole(@Body() createRole: CreateRoleDto) {
    await this.roleBusiness.create(createRole);
    return <IResponse<string>>{
      error: false,
      data: 'Role created sucessfully.',
    };
  }

  @Get()
  async getAllRoles() {
    const roles = await this.roleBusiness.getAll();
    return <IResponse<Role[]>>{
      error: false,
      data: roles,
    };
  }

  @Get(':id')
  async getRole(@Param('id') id: string) {
    const role = await this.roleBusiness.getById(id);

    return <IResponse<Role>>{
      error: false,
      data: role,
    };
  }

  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() payload: Partial<Role>) {
    const role = await this.roleBusiness.getById(id);

    if (!role) {
      throw new Error('Invalid role');
    }

    await this.roleBusiness.updateById(id, payload);

    return <IResponse<string>>{
      error: false,
      data: 'Role updated sucessfully.',
    };
  }

  @Delete('id')
  async deleteRole(@Param('id') id: string) {
    const role = await this.roleBusiness.getById(id);

    if (!role) {
      throw new Error('Invalid role');
    }

    await this.roleBusiness.deleteById(id);
    return <IResponse<string>>{
      error: false,
      data: 'Role deleted sucessfully.',
    };
  }
}

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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmissionCategoryBusiness } from 'src/business/emission-category.business';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IResponse } from 'src/interfaces/IResponse';
import { CreateEmissionCategoryDto } from 'src/models/create-emission-category.dto';
import { EmissionCategory } from 'src/schemas/emission-category.schema';

@ApiTags('Emisson Category')
@Controller('emisson-category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EmissionCategoryController {
  constructor(
    private readonly emissionCategoryBusiness: EmissionCategoryBusiness,
  ) {}

  @Post()
  async createEmissionCategory(
    @Body() createEmissionCategory: CreateEmissionCategoryDto,
  ) {
    await this.emissionCategoryBusiness.create(createEmissionCategory);
    return <IResponse<string>>{
      error: false,
      data: 'Emission Category created sucessfully.',
    };
  }

  @Get()
  async getAllEmissionCategory() {
    const roles = await this.emissionCategoryBusiness.getAll();
    return <IResponse<EmissionCategory[]>>{
      error: false,
      data: roles,
    };
  }

  @Get(':id')
  async getEmissionCategory(@Param('id') id: string) {
    const role = await this.emissionCategoryBusiness.getById(id);

    return <IResponse<EmissionCategory>>{
      error: false,
      data: role,
    };
  }

  @Put(':id')
  async updateEmissionCategory(
    @Param('id') id: string,
    @Body() payload: Partial<EmissionCategory>,
  ) {
    const role = await this.emissionCategoryBusiness.getById(id);

    if (!role) {
      throw new Error('Invalid Emission Category');
    }

    await this.emissionCategoryBusiness.updateById(id, payload);

    return <IResponse<string>>{
      error: false,
      data: 'Emission Category updated sucessfully.',
    };
  }

  @Delete('id')
  async deleteEmissionCategory(@Param('id') id: string) {
    const role = await this.emissionCategoryBusiness.getById(id);

    if (!role) {
      throw new Error('Invalid Emission Category');
    }

    await this.emissionCategoryBusiness.deleteById(id);
    return <IResponse<string>>{
      error: false,
      data: 'Emission Category deleted sucessfully.',
    };
  }
}

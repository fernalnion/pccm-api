import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/schemas/role.schema';
import { BaseBusiness } from './base.business';
import { EmissionCategory } from 'src/schemas/emission-category.schema';

@Injectable()
export class EmissionCategoryBusiness extends BaseBusiness<EmissionCategory> {
  constructor(
    @InjectModel(Role.name) emissionCategory: Model<EmissionCategory>,
  ) {
    super(emissionCategory);
  }
}

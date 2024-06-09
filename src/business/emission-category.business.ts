import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmissionCategory } from 'src/schemas/emission-category.schema';
import { BaseBusiness } from './base.business';

@Injectable()
export class EmissionCategoryBusiness extends BaseBusiness<EmissionCategory> {
  constructor(
    @InjectModel(EmissionCategory.name)
    emissionCategory: Model<EmissionCategory>,
  ) {
    super(emissionCategory);
  }
}

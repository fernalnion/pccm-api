import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarbonFootprint } from 'src/schemas/carbon-footprint.schema';
import { BaseBusiness } from './base.business';

@Injectable()
export class CarbonFootprintBusiness extends BaseBusiness<CarbonFootprint> {
  constructor(
    @InjectModel(CarbonFootprint.name) carbonFootprint: Model<CarbonFootprint>,
  ) {
    super(carbonFootprint);
  }
}

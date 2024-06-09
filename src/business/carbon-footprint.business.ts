import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/schemas/role.schema';
import { BaseBusiness } from './base.business';
import { CarbonFootprint } from 'src/schemas/carbon-footprint.schema';

@Injectable()
export class CarbonFootprintBusiness extends BaseBusiness<CarbonFootprint> {
  constructor(@InjectModel(Role.name) carbonFootprint: Model<CarbonFootprint>) {
    super(carbonFootprint);
  }
}

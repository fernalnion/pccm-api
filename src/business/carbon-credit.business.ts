import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CarbonCredit } from 'src/schemas/carbon-credit.schema';
import { BaseBusiness } from './base.business';

@Injectable()
export class CarbonCreditBusiness extends BaseBusiness<CarbonCredit> {
  constructor(
    @InjectModel(CarbonCredit.name) carbonCredit: Model<CarbonCredit>,
  ) {
    super(carbonCredit);
  }

  getByUserId = (userid: string) =>
    this.collectionModel.findOne({ user: new ObjectId(userid) });
}

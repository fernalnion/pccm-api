import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EmissionCategory } from './emission-category.schema';
import { User } from './user.schema';

export type CarbonFootprintDocument = HydratedDocument<CarbonFootprint>;

@Schema()
export class CarbonFootprint {
  @Prop({ required: true, type: Types.ObjectId, ref: EmissionCategory.name })
  activityType: Types.ObjectId;

  @Prop({ required: true })
  utilizedAmount: number;

  @Prop({ required: true })
  carbonEmissions: number;

  @Prop({ required: true })
  credits: number;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ default: Date.now() })
  activityDate: Date;
}

export const CarbonFootprintSchema =
  SchemaFactory.createForClass(CarbonFootprint);

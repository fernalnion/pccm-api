import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type CarbonCreditDocument = HydratedDocument<CarbonCredit>;

@Schema({ timestamps: true, versionKey: false })
export class CarbonCredit {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  credits: number;
}

export const CarbonCreditSchema = SchemaFactory.createForClass(CarbonCredit);

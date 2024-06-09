import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmissonCategoryDocument = HydratedDocument<EmissionCategory>;

@Schema()
export class EmissionCategory {
  @Prop({ required: true })
  categoty: string;

  @Prop({ required: true })
  emissionFactors: number;

  @Prop({ required: true })
  unit: string;
}

export const EmissionCategorySchema =
  SchemaFactory.createForClass(EmissionCategory);

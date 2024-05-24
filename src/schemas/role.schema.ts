import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true, versionKey: false })
export class Role {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

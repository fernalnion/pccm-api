import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MoongoseSchema } from 'mongoose';
import { Role } from './role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: false })
  lastname?: string;

  @Prop({ type: MoongoseSchema.Types.ObjectId, ref: Role.name })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
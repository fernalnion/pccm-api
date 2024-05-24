import { Injectable } from '@nestjs/common';
import { BaseBusiness } from './base.business';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserBusiness extends BaseBusiness<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  getByEmail = (email: string) => this.collectionModel.findOne({ email });

  override create = async (payload: User) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = new this.collectionModel({
      ...payload,
      password: hashedPassword,
    });
    return newUser.save();
  };
}

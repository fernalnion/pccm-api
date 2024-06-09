import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FilterQuery, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { BaseBusiness } from './base.business';

@Injectable()
export class UserBusiness extends BaseBusiness<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  getByEmail = (email: string) =>
    this.collectionModel.findOne({ email }, {}, { lean: true });

  override create = async (payload: User) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = new this.collectionModel({
      ...payload,
      password: hashedPassword,
    });
    return newUser.save();
  };
  override getAll = (filter?: FilterQuery<any>) =>
    this.collectionModel.find({ ...(filter ?? {}) }, { password: 0 });
}

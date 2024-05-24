import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/schemas/role.schema';
import { BaseBusiness } from './base.business';

@Injectable()
export class RoleBusiness extends BaseBusiness<Role> {
  constructor(@InjectModel(Role.name) roleModel: Model<Role>) {
    super(roleModel);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/schemas/role.schema';
import { RoleBusiness } from './role.business';
import { UserBusiness } from './user.business';
import { User, UserSchema } from 'src/schemas/user.schema';

const BUSINESS = [RoleBusiness, UserBusiness];
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [...BUSINESS],
  exports: [...BUSINESS],
})
export class BusinessModule {}

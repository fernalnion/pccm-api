import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/schemas/role.schema';
import { RoleBusiness } from './role.business';
import { UserBusiness } from './user.business';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CarbonFootprintBusiness } from './carbon-footprint.business';
import { EmissionCategoryBusiness } from './emission-category.business';
import { CarbonFootprint } from 'src/schemas/carbon-footprint.schema';
import {
  CarbonCredit,
  CarbonCreditSchema,
} from 'src/schemas/carbon-credit.schema';
import {
  EmissionCategory,
  EmissionCategorySchema,
} from 'src/schemas/emission-category.schema';
import { CarbonCreditBusiness } from './carbon-credit.business';

const BUSINESS = [
  RoleBusiness,
  UserBusiness,
  CarbonFootprintBusiness,
  EmissionCategoryBusiness,
  CarbonCreditBusiness,
];
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: CarbonFootprint.name, schema: CarbonCreditSchema },
    ]),
    MongooseModule.forFeature([
      { name: EmissionCategory.name, schema: EmissionCategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: CarbonCredit.name, schema: CarbonCreditSchema },
    ]),
  ],
  providers: [...BUSINESS],
  exports: [...BUSINESS],
})
export class BusinessModule {}

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleBusiness } from 'src/business/role.business';
import { UserBusiness } from 'src/business/user.business';
import { IRole } from 'src/interfaces/IRole';
import { IUser } from 'src/interfaces/IUser';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  constructor(
    private readonly roleBuisness: RoleBusiness,
    private readonly userBuisness: UserBusiness,
  ) {}
  async onApplicationBootstrap() {
    const rolePayload: IRole = {
      name: 'admin',
      description: 'Admin Role',
    };
    let role: IRole = await this.roleBuisness.getItem({
      name: rolePayload.name,
    });
    if (!role) {
      const temprole = await this.roleBuisness.create(rolePayload);
      role = {
        ...rolePayload,
        _id: temprole._id,
      };
    }

    const userPayload: IUser = {
      email: 'admin@admin.com',
      password: 'admin@123',
      firstname: 'Admin',
      lastname: 'Admin',
      role: role._id,
    };
    const user = await this.userBuisness.getByEmail(userPayload.email);
    if (!user) {
      await this.userBuisness.create(userPayload);
    }
  }
}

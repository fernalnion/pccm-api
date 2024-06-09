import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [RoleController],
})
export class RoleModule {}

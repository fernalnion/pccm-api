import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [UserController],
})
export class UserModule {}

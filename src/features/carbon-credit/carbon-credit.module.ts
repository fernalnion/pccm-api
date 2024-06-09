import { Module } from '@nestjs/common';
import { CarbonCreditController } from './carbon-credit.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [CarbonCreditController],
})
export class CarbonCreditModule {}

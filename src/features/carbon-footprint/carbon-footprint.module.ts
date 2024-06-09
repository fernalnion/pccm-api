import { Module } from '@nestjs/common';
import { CarbonFootprintController } from './carbon-footprint.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [CarbonFootprintController],
})
export class CarbonFootprintModule {}

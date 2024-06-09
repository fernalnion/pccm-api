import { Module } from '@nestjs/common';
import { CarbonFootprintController } from './carbon-footprint.controller';

@Module({
  controllers: [CarbonFootprintController]
})
export class CarbonFootprintModule {}

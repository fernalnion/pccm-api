import { Module } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { EmissionCategoryController } from './emission-category.controller';

@Module({
  imports: [BusinessModule],
  controllers: [EmissionCategoryController],
})
export class EmissionCategoryModule {}

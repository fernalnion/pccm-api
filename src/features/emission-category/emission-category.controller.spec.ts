import { Test, TestingModule } from '@nestjs/testing';
import { EmissionCategoryController } from './emission-category.controller';
describe('EmissionCategoryController', () => {
  let controller: EmissionCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmissionCategoryController],
    }).compile();

    controller = module.get<EmissionCategoryController>(
      EmissionCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

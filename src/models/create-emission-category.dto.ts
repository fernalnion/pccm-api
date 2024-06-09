import { ApiProperty } from '@nestjs/swagger';

export class CreateEmissionCategoryDto {
  @ApiProperty({ type: String })
  category: string;

  @ApiProperty({ type: Number })
  emissionFactors: number;

  @ApiProperty({ type: String })
  unit: string;
}

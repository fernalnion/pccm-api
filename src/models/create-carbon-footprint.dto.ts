import { ApiProperty } from '@nestjs/swagger';

export class CreateCarbonFootprintDto {
  @ApiProperty({ type: String })
  activityType: string;

  @ApiProperty({ type: Number })
  utilizedAmount: number;
}

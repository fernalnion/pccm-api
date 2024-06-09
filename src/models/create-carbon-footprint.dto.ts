import { ApiProperty } from '@nestjs/swagger';

export class CreateCarbonFootprintDto {
  @ApiProperty({ type: String })
  activityType: string;

  @ApiProperty({ type: Number })
  utilizedAmount: number;

  @ApiProperty({ type: Number })
  carbonEmissions: number;

  @ApiProperty({ type: Number })
  credits: number;
}

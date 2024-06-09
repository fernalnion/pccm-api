import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarbonCreditBusiness } from 'src/business/carbon-credit.business';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IResponse } from 'src/interfaces/IResponse';
import { CarbonCredit } from 'src/schemas/carbon-credit.schema';

@ApiTags('Carbon Credit')
@Controller('carbon-credit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CarbonCreditController {
  constructor(private readonly carbonCreditBusiness: CarbonCreditBusiness) {}
  @Get()
  async getAllCarbonCredit() {
    const carbonCredits = await this.carbonCreditBusiness.getAll();
    return <IResponse<CarbonCredit[]>>{
      error: false,
      data: carbonCredits,
    };
  }

  @Get('/user')
  async getCarbonCreditByUser(@Request() req) {
    const carbonCredit = await this.carbonCreditBusiness.getByUserId(
      req.user.userId,
    );

    return <IResponse<CarbonCredit>>{
      error: false,
      data: carbonCredit,
    };
  }
}

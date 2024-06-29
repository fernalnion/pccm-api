import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CarbonCreditBusiness } from 'src/business/carbon-credit.business';
import { CarbonFootprintBusiness } from 'src/business/carbon-footprint.business';
import { EmissionCategoryBusiness } from 'src/business/emission-category.business';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { IResponse } from 'src/interfaces/IResponse';
import { CreateCarbonFootprintDto } from 'src/models/create-carbon-footprint.dto';
import { CarbonFootprint } from 'src/schemas/carbon-footprint.schema';
import {
  calculateCarbonCredit,
  calculateCarbonEmission,
} from 'src/services/util.service';

@ApiTags('Carbon Footprint')
@Controller('carbon-footprint')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CarbonFootprintController {
  constructor(
    private readonly carbonFootprintBusiness: CarbonFootprintBusiness,
    private readonly emissionCategoryBusiness: EmissionCategoryBusiness,
    private readonly carbonCreditBusiness: CarbonCreditBusiness,
  ) {}

  @Post()
  async createCarbonFootprint(
    @Body() createCarbonFootprint: CreateCarbonFootprintDto,
    @Request() req,
  ) {
    const emissionCategory = await this.emissionCategoryBusiness.getById(
      createCarbonFootprint.activityType,
    );

    if (!emissionCategory) {
      throw new Error('Invalid emission category');
    }

    // calculation for carbon emission & credits
    const carbonEmissions: number = calculateCarbonEmission(
      createCarbonFootprint.utilizedAmount,
      emissionCategory.emissionFactors,
    );
    const credits: number = calculateCarbonCredit(carbonEmissions);

    await this.carbonFootprintBusiness.create({
      ...createCarbonFootprint,
      activityType: emissionCategory._id,
      user: new ObjectId(req.user.userId),
      carbonEmissions,
      credits,
      activityDate: new Date(),
    });

    // update carbon credit to the user
    const existingUsercredit = await this.carbonCreditBusiness.getByUserId(
      req.user.userId,
    );
    if (existingUsercredit) {
      await this.carbonCreditBusiness.updateById(
        existingUsercredit._id.toString(),
        { credits: existingUsercredit.credits + credits },
      );
    } else {
      await this.carbonCreditBusiness.create({
        user: new ObjectId(req.user.userId),
        credits,
      });
    }

    return <IResponse<{ credits: number; carbonEmissions: number }>>{
      error: false,
      data: {
        carbonEmissions,
        credits,
      },
    };
  }

  @Get()
  async getAllCarbonFootprintByUser(@Request() req) {
    const carbonFootprints = await this.carbonFootprintBusiness.getAll({
      user: new ObjectId(req.user.userId),
    });
    return <IResponse<CarbonFootprint[]>>{
      error: false,
      data: carbonFootprints,
    };
  }

  @Get(':id')
  async getCarbonFootprint(@Param('id') id: string) {
    const carbonFootprint = await this.carbonFootprintBusiness.getById(id);

    return <IResponse<CarbonFootprint>>{
      error: false,
      data: carbonFootprint,
    };
  }

  @Put(':id')
  async updateCarbonFootprint(
    @Param('id') id: string,
    @Body() payload: CreateCarbonFootprintDto,
    @Request() req,
  ) {
    const carbonFootprint = await this.carbonFootprintBusiness.getById(id);

    const oldEmissionCategory = await this.emissionCategoryBusiness.getById(
      carbonFootprint.activityType.toString(),
    );

    // old calculation for carbon emission & credits
    const oldCarbonEmissions: number = calculateCarbonEmission(
      carbonFootprint.utilizedAmount,
      oldEmissionCategory.emissionFactors,
    );
    const oldCredits: number = calculateCarbonCredit(oldCarbonEmissions);

    // new calculation for carbon emission & credits
    const newEmissionCategory = await this.emissionCategoryBusiness.getById(
      payload.activityType,
    );

    if (!newEmissionCategory) {
      throw new Error('Invalid emission category');
    }

    // calculation for carbon emission & credits
    const newCarbonEmissions: number = calculateCarbonEmission(
      payload.utilizedAmount,
      newEmissionCategory.emissionFactors,
    );
    const newCredits: number = calculateCarbonCredit(newCarbonEmissions);

    await this.carbonFootprintBusiness.updateById(id, {
      activityType: newEmissionCategory._id,
      user: new ObjectId(req.user.userId),
      carbonEmissions: newCarbonEmissions,
      credits: newCredits,
      activityDate: new Date(),
    });

    // update carbon credit to the user
    const existingUsercredit = await this.carbonCreditBusiness.getByUserId(
      req.user.userId,
    );

    // reduce old credited value and add new credit value
    if (existingUsercredit) {
      await this.carbonCreditBusiness.updateById(
        existingUsercredit._id.toString(),
        { credits: existingUsercredit.credits - oldCredits + newCredits },
      );
    } else {
      await this.carbonCreditBusiness.create({
        user: new ObjectId(req.user.userId),
        credits: newCredits,
      });
    }

    return <IResponse<string>>{
      error: false,
      data: 'Carbon Footprint updated sucessfully.',
    };
  }

  @Delete('id')
  async deleteRole(@Param('id') id: string, @Request() req) {
    const carbonFootprint = await this.carbonFootprintBusiness.getById(id);

    if (!carbonFootprint) {
      throw new Error('Invalid Carbon Footprint');
    }

    const emissionCategory = await this.emissionCategoryBusiness.getById(
      carbonFootprint.activityType._id.toString(),
    );

    // calculation for carbon emission & credits
    const carbonEmissions: number = calculateCarbonEmission(
      carbonFootprint.utilizedAmount,
      emissionCategory.emissionFactors,
    );
    const credits: number = calculateCarbonCredit(carbonEmissions);
    // update carbon credit to the user
    const existingUsercredit = await this.carbonCreditBusiness.getByUserId(
      req.user.userId,
    );

    // remove credit amount for the emission
    if (existingUsercredit) {
      await this.carbonCreditBusiness.updateById(
        existingUsercredit._id.toString(),
        { credits: existingUsercredit.credits - credits },
      );
    }

    await this.carbonFootprintBusiness.deleteById(id);
    return <IResponse<string>>{
      error: false,
      data: 'Carbon Footprint deleted sucessfully.',
    };
  }
}

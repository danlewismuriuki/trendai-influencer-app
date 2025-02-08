import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { ICampaign } from '../campaign/schemas/campaign.schema';
import { CreateCampaignDto } from '../campaign/dto/campaign.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get()
  async getAllCampaigns(): Promise<ICampaign[]> {
    return this.campaignService.getAllCampaigns();
  }

  @Get(':id')
  async getCampaignById(@Param('id') id: string): Promise<ICampaign> {
    return this.campaignService.getCampaignById(id);
  }

  @Post()
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto): Promise<ICampaign> {
    return this.campaignService.createCampaign(createCampaignDto);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICampaign } from '../campaign/schemas/campaign.schema';
import { CreateCampaignDto } from '../campaign/dto/campaign.dto';

@Injectable()
export class CampaignService {
  constructor(@InjectModel('Campaign') private readonly campaignModel: Model<ICampaign>) {}

  async getAllCampaigns(): Promise<ICampaign[]> {
    return this.campaignModel.find().select('title status deadline').exec();
  }

  async getCampaignById(id: string): Promise<ICampaign> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }

  async createCampaign(createCampaignDto: CreateCampaignDto): Promise<ICampaign> {
    const newCampaign = new this.campaignModel(createCampaignDto);
    return newCampaign.save();
  }
}

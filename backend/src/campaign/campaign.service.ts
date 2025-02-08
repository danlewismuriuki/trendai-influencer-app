// import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { ICampaign } from './schemas/campaign.schema';
// import { HttpException, HttpStatus } from '@nestjs/common';

// @Injectable()
// export class CampaignService {
//   constructor(@InjectModel('Campaign') private campaignModel: Model<ICampaign>) {}

//   async getAllCampaigns(): Promise<ICampaign[]> {
//     return this.campaignModel.find().exec();
//   }

//   async getCampaignById(id: string): Promise<ICampaign> {
//     const campaign = await this.campaignModel.findById(id).exec();
//     if (!campaign) {
//       throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
//     }
//     return campaign;
//   }

//   async createCampaign(createCampaignDto: any): Promise<ICampaign> {
//     const newCampaign = new this.campaignModel(createCampaignDto);
//     return newCampaign.save();
//   }

//   async updateCampaign(id: string, updatedCampaign: ICampaign): Promise<ICampaign> {
//     const updated = await this.campaignModel.findByIdAndUpdate(
//       id,
//       updatedCampaign,
//       { new: true }
//     ).exec();

//     if (!updated) {
//       throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
//     }

//     return updated;
//   }
// }


import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICampaign } from './schemas/campaign.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CampaignService {
  constructor(@InjectModel('Campaign') private campaignModel: Model<ICampaign>) {}

  // GET all campaigns
  async getAllCampaigns(): Promise<ICampaign[]> {
    return this.campaignModel.find().exec();
  }

  // GET campaign by ID
  async getCampaignById(id: string): Promise<ICampaign> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) {
      throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
    }
    return campaign;
  }

  // POST create a new campaign
  async createCampaign(createCampaignDto: any): Promise<ICampaign> {
    const newCampaign = new this.campaignModel(createCampaignDto);
    return newCampaign.save();
  }

  // PATCH update campaign status
  async updateCampaignStatus(id: string, status: 'pending' | 'ongoing' | 'completed'): Promise<ICampaign> {
    const updatedCampaign = await this.campaignModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();

    if (!updatedCampaign) {
      throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
    }

    return updatedCampaign;
  }

  // POST add submission to a campaign
  async addSubmission(id: string, createSubmissionDto: any): Promise<ICampaign> {
    const campaign = await this.getCampaignById(id);

    if (campaign.status !== 'ongoing') {
      throw new HttpException('Submissions are not allowed for this campaign', HttpStatus.BAD_REQUEST);
    }

    const submission = {
      influencerId: createSubmissionDto.influencerId,
      contentUrl: createSubmissionDto.contentUrl,
      submittedAt: new Date(),
    };

    campaign.submissions.push(submission);

    return campaign.save();
  }
}
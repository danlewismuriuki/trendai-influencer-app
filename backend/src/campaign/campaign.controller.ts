// // import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// // import { CampaignService } from './campaign.service';
// // import { ICampaign } from '../campaign/schemas/campaign.schema';
// // import { CreateCampaignDto } from '../campaign/dto/campaign.dto';

// // @Controller('campaigns')
// // export class CampaignController {
// //   constructor(private readonly campaignService: CampaignService) {}

// //   @Get()
// //   async getAllCampaigns(): Promise<ICampaign[]> {
// //     return this.campaignService.getAllCampaigns();
// //   }

// //   @Get(':id')
// //   async getCampaignById(@Param('id') id: string): Promise<ICampaign> {
// //     return this.campaignService.getCampaignById(id);
// //   }

// //   @Post()
// //   async createCampaign(@Body() createCampaignDto: CreateCampaignDto): Promise<ICampaign> {
// //     return this.campaignService.createCampaign(createCampaignDto);
// //   }
// // }


// import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
// import { CampaignService } from './campaign.service';
// import { ICampaign } from './schemas/campaign.schema';
// import { CreateCampaignDto } from '../campaign/dto/campaign.dto';
// import { CreateSubmissionDto } from './dto/create-submission.dto';

// @Controller('campaigns')
// export class CampaignController {
//   constructor(private readonly campaignService: CampaignService) {}

//   @Get()
//   async getAllCampaigns(): Promise<ICampaign[]> {
//     return this.campaignService.getAllCampaigns();
//   }

//   @Get(':id')
//   async getCampaignById(@Param('id') id: string): Promise<ICampaign> {
//     return this.campaignService.getCampaignById(id);
//   }

//   @Post()
//   async createCampaign(@Body() createCampaignDto: CreateCampaignDto): Promise<ICampaign> {
//     return this.campaignService.createCampaign(createCampaignDto);
//   }

//   @Post(':id/submissions')
//   async addSubmission(
//     @Param('id') campaignId: string,
//     @Body() createSubmissionDto: CreateSubmissionDto,
//   ): Promise<ICampaign> {

//     const campaign = await this.campaignService.getCampaignById(campaignId);
//     if (!campaign) {
//       throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
//     }

//     if (campaign.status !== 'ongoing') {
//       throw new HttpException('Submissions are not allowed for this campaign', HttpStatus.BAD_REQUEST);
//     }

//     // Create the submission object
//     const submission = {
//       influencerId: createSubmissionDto.influencerId,
//       contentUrl: createSubmissionDto.contentUrl,
//       submittedAt: new Date(),
//     };

//     campaign.submissions.push(submission);

//     return this.campaignService.updateCampaign(campaignId, campaign);
//   }
// }

import { Controller, Get, Post, Body, Param, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { ICampaign } from './schemas/campaign.schema';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  // GET all campaigns
  @Get()
  async getAllCampaigns(): Promise<ICampaign[]> {
    return this.campaignService.getAllCampaigns();
  }

  // GET campaign by ID
  @Get(':id')
  async getCampaignById(@Param('id') id: string): Promise<ICampaign> {
    return this.campaignService.getCampaignById(id);
  }

  // POST create a new campaign
  @Post()
  async createCampaign(@Body() createCampaignDto: any): Promise<ICampaign> {
    return this.campaignService.createCampaign(createCampaignDto);
  }

  // PATCH update campaign status
  @Patch(':id/status')
  async updateCampaignStatus(
    @Param('id') campaignId: string,
    @Body('status') status: 'pending' | 'ongoing' | 'completed',
  ): Promise<ICampaign> {
    // Validate the status value
    if (!['pending', 'ongoing', 'completed'].includes(status)) {
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }

    // Update the campaign status
    return this.campaignService.updateCampaignStatus(campaignId, status);
  }

  // POST add submission to a campaign
  @Post(':id/submissions')
  async addSubmission(
    @Param('id') campaignId: string,
    @Body() createSubmissionDto: any,
  ): Promise<ICampaign> {
    return this.campaignService.addSubmission(campaignId, createSubmissionDto);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignSchema } from './schemas/campaign.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Campaign', schema: CampaignSchema }])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from './campaign.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICampaign } from '../campaign/schemas/campaign.schema';
import { NotFoundException } from '@nestjs/common';

describe('CampaignService', () => {
  let campaignService: CampaignService;
  let campaignModel: Model<ICampaign>;

  const mockCampaigns: ICampaign[] = [
    {
      _id: '1',
      title: 'Campaign 1',
      description: 'Description 1',
      instructions: 'Follow these instructions',
      status: 'ongoing',
      deadline: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      title: 'Campaign 2',
      description: 'Description 2',
      instructions: 'Follow these instructions',
      status: 'completed',
      deadline: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as ICampaign[];

  const mockCampaignModel = {
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(mockCampaigns),
      exec: jest.fn(),
    }),
    findById: jest.fn((id: string) => ({
      exec: jest.fn().mockResolvedValue(mockCampaigns.find((campaign) => campaign._id === id) || null),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: getModelToken('Campaign'),
          useValue: mockCampaignModel,
        },
      ],
    }).compile();

    campaignService = module.get<CampaignService>(CampaignService);
    campaignModel = module.get<Model<ICampaign>>(getModelToken('Campaign'));
  });

  it('should be defined', () => {
    expect(campaignService).toBeDefined();
  });

  describe('getAllCampaigns', () => {
    it('should return an array of campaigns with selected fields', async () => {
      const result = await campaignService.getAllCampaigns();
      expect(result).toEqual(mockCampaigns);
      expect(mockCampaignModel.find).toHaveBeenCalled();
    });
  });

  describe('getCampaignById', () => {
    it('should return a campaign if found', async () => {
      const result = await campaignService.getCampaignById('1');
      expect(result).toEqual(mockCampaigns[0]);
      expect(mockCampaignModel.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if campaign is not found', async () => {
      await expect(campaignService.getCampaignById('99')).rejects.toThrow(NotFoundException);
      expect(mockCampaignModel.findById).toHaveBeenCalledWith('99');
    });
  });
});

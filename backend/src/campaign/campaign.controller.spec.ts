import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { ICampaign } from '../campaign/schemas/campaign.schema';

describe('CampaignController', () => {
  let campaignController: CampaignController;
  let campaignService: CampaignService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        {
          provide: CampaignService,
          useValue: {
            getAllCampaigns: jest.fn().mockResolvedValue(mockCampaigns),
            getCampaignById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve(mockCampaigns.find((campaign) => campaign._id === id)),
            ),
          },
        },
      ],
    }).compile();

    campaignController = module.get<CampaignController>(CampaignController);
    campaignService = module.get<CampaignService>(CampaignService);
  });

  it('should be defined', () => {
    expect(campaignController).toBeDefined();
  });

  describe('getAllCampaigns', () => {
    it('should return an array of campaigns', async () => {
      const result = await campaignController.getAllCampaigns();
      expect(result).toEqual(mockCampaigns);
      expect(campaignService.getAllCampaigns).toHaveBeenCalled();
    });
  });

  describe('getCampaignById', () => {
    it('should return a single campaign by ID', async () => {
      const result = await campaignController.getCampaignById('1');
      expect(result).toEqual(mockCampaigns[0]);
      expect(campaignService.getCampaignById).toHaveBeenCalledWith('1');
    });

    it('should return undefined if campaign does not exist', async () => {
      const result = await campaignController.getCampaignById('99');
      expect(result).toBeUndefined();
      expect(campaignService.getCampaignById).toHaveBeenCalledWith('99');
    });
  });
});
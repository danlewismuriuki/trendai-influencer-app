import { IsString, IsEnum, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsEnum(['pending', 'ongoing', 'completed'])
  status: 'pending' | 'ongoing' | 'completed';

  @IsDate()
  @IsNotEmpty()
  deadline: Date;
}

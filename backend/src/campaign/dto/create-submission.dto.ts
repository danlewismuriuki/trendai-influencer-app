import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  influencerId: string;

  @IsString()
  @IsNotEmpty()
  contentUrl: string;
}
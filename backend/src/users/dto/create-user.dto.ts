import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  influencerName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8) 
  password: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' })
  phoneNumber: string;
}

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserDocument } from '../users/user.schema';
import { Types } from 'mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockUser: UserDocument = {
    _id: new Types.ObjectId(),
    influencerName: 'TestInfluencer',
    phoneNumber: '+1234567890',
    email: 'testuser@example.com',
    password: 'hashedpassword123',
  } as UserDocument;

  const mockAuthService = {
    validateUser: jest.fn().mockResolvedValue(mockUser),
    login: jest.fn().mockResolvedValue({ access_token: 'mock-jwt-token' }),
    register: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should call login and return an access token', async () => {
    const authDto: AuthCredentialsDto = { email: 'testuser@example.com', password: 'password123' };

    const result = await authController.login(authDto);

    expect(authService.validateUser).toHaveBeenCalledWith(authDto.email, authDto.password);
    expect(authService.login).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({ access_token: 'mock-jwt-token' });
  });

  it('should register a new user', async () => {
    const authDto: AuthCredentialsDto = { email: 'newuser@example.com', password: 'password123' };

    const result = await authController.register(authDto);

    expect(authService.register).toHaveBeenCalledWith(authDto);
    expect(result).toEqual(mockUser);
  });
});

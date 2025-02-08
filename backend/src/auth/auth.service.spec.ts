import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<UserDocument>;
  let jwtService: JwtService;

const mockUser = {
  _id: new Types.ObjectId(),
  influencerName: 'testuser',
  email: 'testuser@example.com',
  password: 'hashedpassword123',
  phoneNumber: '+1234567890',
  save: jest.fn(),
  toJSON: jest.fn().mockReturnValue({ /* Simulate serialized user */ }),
} as unknown as jest.Mocked<UserDocument>;

  

  const mockUserModel = {
    findOne: jest.fn().mockResolvedValue({
      ...mockUser,
      save: jest.fn().mockResolvedValue(mockUser),
    }),
    findById: jest.fn().mockResolvedValue({
      ...mockUser,
      save: jest.fn().mockResolvedValue(mockUser),
    }),
    create: jest.fn().mockResolvedValue({
      ...mockUser,
      save: jest.fn().mockResolvedValue(mockUser),
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate user and return user document', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await authService.validateUser('testuser', 'password123');

      expect(userModel.findOne).toHaveBeenCalledWith({ influencerName: 'testuser' });
      expect(result).toEqual(expect.objectContaining(mockUser));
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      const result = await authService.validateUser('testuser', 'wrongpassword');

      expect(userModel.findOne).toHaveBeenCalledWith({ influencerName: 'testuser' });
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT token on successful login', async () => {
      const result = await authService.login(mockUser as UserDocument);

      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockUser.influencerName,
        sub: mockUser._id.toString(),
      });
      expect(result).toEqual({ access_token: 'mock-jwt-token' });
    });
  });
});

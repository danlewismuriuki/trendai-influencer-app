import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<UserDocument>;

  const mockUser = {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  };

  const mockUserModel = {
    findOne: jest.fn().mockImplementation((query) => {
      return {
        exec: jest.fn().mockResolvedValue(query.email === mockUser.email ? mockUser : null),
      };
    }),
    create: jest.fn().mockImplementation((userData) => Promise.resolve({ _id: '1', ...userData })),
    save: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockUserModel },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should return a user if email matches', async () => {
      const user = await usersService.findOneByEmail('test@example.com');

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(user).toEqual(mockUser);
    });

    it('should return null if no user is found', async () => {
      const user = await usersService.findOneByEmail('nonexistent@example.com');

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user and return it', async () => {
      const newUserDto = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      };

      const result = await usersService.createUser(newUserDto);

      expect(result).toEqual({ _id: '1', ...newUserDto });
    });
  });
});

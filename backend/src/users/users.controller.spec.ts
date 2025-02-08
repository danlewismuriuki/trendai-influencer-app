import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    createUser: jest.fn().mockImplementation((userData) => Promise.resolve({ id: '1', ...userData })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const userDto = {
        influencerName: 'TestInfluencer',
        email: 'test@example.com',
        password: 'password123',
        phoneNumber: '+1234567890',
      };

      const result = await usersController.register(userDto);

      expect(mockUsersService.createUser).toHaveBeenCalledWith(userDto);
      expect(result).toEqual({ id: '1', ...userDto });
    });
  });

  describe('login', () => {
    it('should return login successful message', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };

      const result = await usersController.login(loginDto);

      expect(result).toEqual({ message: 'Login successful' });
    });
  });
});

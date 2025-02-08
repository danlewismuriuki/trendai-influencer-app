// // import { Controller, Post, Body } from '@nestjs/common';
// // import { UsersService } from './users.service';
// // import { LoginUserDto } from './dto/login-user.dto';
// // import { CreateUserDto } from './dto/create-user.dto';

// // @Controller('auth')
// // export class UsersController {
// //   constructor(private readonly usersService: UsersService) {}

// //   @Post('register')
// //   async register(@Body() userData: CreateUserDto) {
// //     return this.usersService.createUser(userData);
// //   }

// //   @Post('login')
// //   async login(@Body() loginData: LoginUserDto) {
// //     return { message: 'Login successful' };
// //   }
// // }


// import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth/auth.service';
// import { LoginUserDto } from './dto/login-user.dto';
// import { CreateUserDto } from './dto/create-user.dto';

// @Controller('auth')
// export class UsersController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() userData: CreateUserDto) {
//     return this.authService.register(userData);
//   }

//   @Post('login')
//   async login(@Body() loginData: LoginUserDto) {
//     const token = await this.authService.signIn(loginData);
//     return { message: 'Login successful', access_token: token.access_token };
//   }
// }

import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    this.logger.log(`Received registration request: ${JSON.stringify(userData)}`);
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() loginData: LoginUserDto) {
    this.logger.log(`Received login request: ${JSON.stringify(loginData)}`);
    const token = await this.authService.signIn(loginData);
    return { message: 'Login successful', access_token: token.access_token };
  }
}

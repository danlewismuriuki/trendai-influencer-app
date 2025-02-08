// import { Controller, Post, Body, UseGuards, UnauthorizedException, Logger } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { CreateUserDto } from '../users/dto/create-user.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(@Body() authCredentialsDto: AuthCredentialsDto) {
//     const user = await this.authService.validateUser(authCredentialsDto.email, authCredentialsDto.password);
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     return this.authService.login(user);
//   }

//   @Post('register')
//   async register(@Body() createUserDto: CreateUserDto) { 
//     this.logger.log(`Received registration request: ${JSON.stringify(createUserDto)}`);
//     return this.authService.register(createUserDto); 
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Post('test')
//   testAuth() {
//     return { message: 'Authenticated successfully!' };
//   }
// }


import { Controller, Post, Body, UseGuards, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    const user = await this.authService.validateUser(authCredentialsDto.email, authCredentialsDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Received registration request: ${JSON.stringify(createUserDto)}`); // Use Logger here
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('test')
  testAuth() {
    return { message: 'Authenticated successfully!' };
  }
}
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from '../users/user.schema';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<UserDocument>,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string): Promise<UserDocument | null> {
//     const user = await this.userModel.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       return user;
//     }
//     return null;
//   }

//   async validateUserById(userId: string): Promise<UserDocument | null> {
//     return this.userModel.findById(userId).exec();
//   }

//   async register(authCredentialsDto: AuthCredentialsDto): Promise<UserDocument> {
//     const { email, password } = authCredentialsDto;

//     const existingUser = await this.userModel.findOne({ email });
//     if (existingUser) {
//       throw new Error('User already exists');
//     }

//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new this.userModel({
//       email,
//       password: hashedPassword,
//       name: email.split('@')[0], // Default name from email username
//     });

//     await user.save();
//     return user;
//   }

//   async login(user: UserDocument) {
//     const payload = { email: user.email, sub: user._id.toString() };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
//     const { email, password } = authCredentialsDto;
//     const user = await this.validateUser(email, password);
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     return this.login(user);
//   }
// }



import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { CreateUserDto } from '../auth/dto/create-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateUserById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  async register(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, password, influencerName, phoneNumber } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const user = new this.userModel({
      influencerName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    try {
      // Save the user to the database
      return await user.save();
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.code === 11000) {
        throw new ConflictException('Email or phone number already exists.');
      } else {
        throw new InternalServerErrorException('Failed to register user.');
      }
    }
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.login(user);
  }
}
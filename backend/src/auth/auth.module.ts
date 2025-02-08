// // import { Module } from '@nestjs/common';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { AuthService } from './auth.service';
// // import { AuthController } from './auth.controller';
// // import { UsersModule } from '../users/users.module';
// // import { JwtModule } from '@nestjs/jwt';
// // import { PassportModule } from '@nestjs/passport';
// // import { jwtConstants } from './constants';
// // import { LocalStrategy } from './strategy/local.strategy';
// // import { JwtStrategy } from './strategy/jwt.strategy';
// // import { JwtAuthGuard } from './jwt-auth.guard';
// // import { User, UserSchema } from '../users/user.schema';

// // @Module({
// //   imports: [
// //     UsersModule,
// //     PassportModule,
// //     JwtModule.register({
// //       secret: jwtConstants.secret,
// //       signOptions: { expiresIn: '1h' },
// //     }),
// //     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
// //   ],
// //   controllers: [AuthController],
// //   providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
// //   exports: [AuthService],
// // })
// // export class AuthModule {}


// import { Module, forwardRef } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { jwtConstants } from './constants';
// import { LocalStrategy } from './strategy/local.strategy';
// import { JwtStrategy } from './strategy/jwt.strategy';

// @Module({
//   imports: [
//     forwardRef(() => UsersModule),
//     PassportModule,
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   providers: [AuthService, LocalStrategy, JwtStrategy],
//   controllers: [AuthController],
//   exports: [AuthService],
// })
// export class AuthModule {}


import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

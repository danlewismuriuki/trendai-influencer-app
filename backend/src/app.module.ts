import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CampaignModule } from './campaign/campaign.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';


@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI),
    AuthModule,
    CampaignModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Configuration
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
      ? 'https://your-frontend-domain.com'
      : ['http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));


  app.setGlobalPrefix('api');

  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);

  process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}

bootstrap();
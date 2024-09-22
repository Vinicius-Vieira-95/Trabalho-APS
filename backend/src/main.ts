/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { classValidatorExceptionFactory } from '@/presentation/errors/exceptions/class-validator-factory.exception';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({  
    origin: 'http://localhost:5173', 
  })); 
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: classValidatorExceptionFactory,
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

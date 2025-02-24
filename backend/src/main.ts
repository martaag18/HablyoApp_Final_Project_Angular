import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200', // O el dominio real de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // 3. Usa ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  console.log('MONGO_URI:', process.env.MONGO_URI ? 'Cargado' : 'No cargado');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Cargado' : 'No cargado');

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:3000`);
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap', err);
});

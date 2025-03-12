import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs'; // <-- Importar fs para leer los archivos

async function bootstrap() {
  // 1. Prepara las opciones HTTPS con tus archivos key.pem y cert.pem
  const httpsOptions = {
    key: fs.readFileSync('./keys/key.pem'),
    cert: fs.readFileSync('./keys/cert.pem'),
  };

  // 2. Creas la aplicación Nest con { httpsOptions }
  const app = await NestFactory.create(AppModule, { httpsOptions });

  // 3. Habilitas cookie-parser para que req.cookies exista
  app.use(cookieParser());

  // 4. Configuras CORS para permitir peticiones desde tu frontend
  //    NOTA: si tu frontend también está en HTTPS, origin debería ser 'https://localhost:4200'
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // 5. ValidationPipe global para validaciones de DTO
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

  // Logs de tus variables de entorno
  console.log('MONGO_URI:', process.env.MONGO_URI ? 'Cargado' : 'No cargado');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Cargado' : 'No cargado');

  // 6. Inicias la aplicación en el puerto 3000
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: https://localhost:3000`);
}

// 7. Manejo de errores global si falla la creación
bootstrap().catch((err) => {
  console.error('Error during app bootstrap', err);
});

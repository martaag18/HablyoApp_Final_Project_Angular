import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WhitelistModule } from './whitelist/whitelist.module';
import { AuthModule } from './auth/auth.module';
import { UsersWebinarModule } from './users-webinar/users-webinar.module';

@Module({
  imports: [
    // Cargar ConfigModule primero para que las variables de entorno estén disponibles
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('Mongo URI is not defined');
        }
        return { uri };
      },
    }),
    UsersModule,
    WhitelistModule,
    AuthModule,
    UsersWebinarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

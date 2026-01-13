import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BundleModule } from './bundle/bundle.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Bundle } from './bundle/entities/bundle.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'test'),
        database: configService.get<string>('DB_DATABASE', 'bundle_db'),
        entities: [User, Bundle],
        synchronize: true, // For development only
      }),
      inject: [ConfigService],
    }),
    UserModule,
    BundleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

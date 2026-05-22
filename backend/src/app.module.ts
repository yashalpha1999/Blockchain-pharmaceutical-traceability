import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FabricModule } from './fabric/fabric.module';
import { DrugsModule } from './modules/drugs/drugs.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { AuditModule } from './modules/audit/audit.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASS', 'postgres'),
        database: configService.get<string>('DB_NAME', 'pharmachain'),
        entities: [User],
        synchronize: true, // Auto-create schema for MVP
      }),
    }),
    AuthModule,
    UsersModule,
    FabricModule,
    DrugsModule,
    ShipmentsModule,
    PrescriptionsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

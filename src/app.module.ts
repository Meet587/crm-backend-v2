import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BuilderModule } from './builder/builder.module';
import { CityModule } from './city/city.module';
import { CommissionModule } from './commission/commission.module';
import environmentConfig from './config/environment.config';
import { TypeOrmConfigService } from './db/typeorm-config.service';
import { DealModule } from './deal/deal.module';
import { LeadsModule } from './leads/leads.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { PropertyManagementModule } from './propert-management/property-management.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [environmentConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: seconds(10),
          limit: 100,
          name: 'default',
          blockDuration: seconds(1),
        },
      ],
      errorMessage: 'Too many requests!',
    }),
    AuthModule,
    LeadsModule,
    CommissionModule,
    UsersModule,
    BuilderModule,
    CityModule,
    ProjectManagementModule,
    PropertyManagementModule,
    DealModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

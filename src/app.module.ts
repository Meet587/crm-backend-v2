import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { LeadsModule } from './leads/leads.module';
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

    AuthModule,
    LeadsModule,
    CommissionModule,
    UsersModule,
    BuilderModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

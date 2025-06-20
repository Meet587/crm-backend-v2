import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { DbConfig } from '../config/interfaces/db.config';
import { BuilderEntity } from './entities/builder.entity';
import { ClientEntity } from './entities/client.entity';
import { DealEntity } from './entities/deal.entity';
import { LeadEntity } from './entities/lead.entity';
import { PropertyEntity } from './entities/property.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    try {
      const dbConfig = this.configService.getOrThrow<DbConfig>(
        'environment.dbConfig',
      );
      if (!dbConfig) {
        throw new Error('DB config not provided');
      }
      return {
        type: dbConfig.type,
        database: dbConfig.dbname,
        host: dbConfig.host,
        username: dbConfig.username,
        password: dbConfig.password,
        port: dbConfig.port,
        entities: [
          UserEntity,
          PropertyEntity,
          ClientEntity,
          DealEntity,
          LeadEntity,
          BuilderEntity,
        ],
        logging: false,
        // autoLoadEntities: true,
        // synchronize: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      } as TypeOrmModuleOptions;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

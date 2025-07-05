import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { DbConfig } from '../config/interfaces/db.config';
import { BuilderContactEntity } from './entities/builder-contact.entity';
import { BuilderEntity } from './entities/builder.entity';
import { CityEntity } from './entities/city.entity';
import { CommissionEntity } from './entities/commission.entity';
import { DealEntity } from './entities/deal.entity';
import { LeadActivityEntity } from './entities/lead-activity.entity';
import { LeadSourceEntity } from './entities/lead-source.entity';
import { LeadEntity } from './entities/lead.entity';
import { ProjectEntity } from './entities/project.entity';
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
          ProjectEntity,
          BuilderEntity,
          BuilderContactEntity,
          CityEntity,
          CommissionEntity,
          DealEntity,
          LeadEntity,
          LeadSourceEntity,
          LeadActivityEntity,
        ],
        logging: false,
        autoLoadEntities: true,
        synchronize: true,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      } as TypeOrmModuleOptions;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

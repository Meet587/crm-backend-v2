import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as env from '../config/environment.config';
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

dotenv.config();
const dbConfig = env.getConfig().dbConfig as DbConfig;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
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
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: true,
  logging: false,
};

export default new DataSource(dataSourceOptions);

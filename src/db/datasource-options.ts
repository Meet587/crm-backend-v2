import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as env from '../config/environment.config';
import { DbConfig } from '../config/interfaces/db.config';
import { BuilderEntity } from './entities/builder.entity';
import { ClientEntity } from './entities/client.entity';
import { DealEntity } from './entities/deal.entity';
import { LeadEntity } from './entities/lead.entity';
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
    ClientEntity,
    DealEntity,
    LeadEntity,
    BuilderEntity,
  ],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: false,
};

export default new DataSource(dataSourceOptions);

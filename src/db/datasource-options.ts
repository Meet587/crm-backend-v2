import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as env from '../config/environment.config';
import { DbConfig } from '../config/interfaces/db.config';
import { AmenitiesEntity } from './entities/amenities.entity';
import { BuilderContactEntity } from './entities/builder-contact.entity';
import { BuilderEntity } from './entities/builder.entity';
import { CityEntity } from './entities/city.entity';
import { CommercialUnitEntity } from './entities/commercial-unit.entity';
import { CommissionEntity } from './entities/commission.entity';
import { DealEntity } from './entities/deal.entity';
import { LandPlotEntity } from './entities/land-plot.entity';
import { LeadActivityEntity } from './entities/lead-activity.entity';
import { LeadAssignmentHistoryEntity } from './entities/lead-assignment-history.entity';
import { LeadSourceEntity } from './entities/lead-source.entity';
import { LeadStatusHistoryEntity } from './entities/lead-status-history.entity';
import { LeadEntity } from './entities/lead.entity';
import { ProjectEntity } from './entities/project.entity';
import { PropertyExtraChargeEntity } from './entities/property-extra-charge.entity';
import { PropertyFurnitureDetailsEntity } from './entities/property-furniture.entity';
import { PropertyPricingEntity } from './entities/property-pricing.entity';
import { PropertyUploadEntity } from './entities/property-upload.entity';
import { PropertyEntity } from './entities/property.entity';
import { ResidentialUnitEntity } from './entities/residential-unit.entity';
import { UnitFloorPlanEntity } from './entities/unit-floor-plan.entity';
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
    PropertyUploadEntity,
    PropertyPricingEntity,
    PropertyFurnitureDetailsEntity,
    PropertyExtraChargeEntity,
    ProjectEntity,
    ResidentialUnitEntity,
    CommercialUnitEntity,
    LandPlotEntity,
    UnitFloorPlanEntity,
    BuilderEntity,
    BuilderContactEntity,
    CityEntity,
    CommissionEntity,
    DealEntity,
    LeadEntity,
    LeadSourceEntity,
    LeadActivityEntity,
    LeadAssignmentHistoryEntity,
    LeadStatusHistoryEntity,
    AmenitiesEntity,
  ],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: false,
};

export default new DataSource(dataSourceOptions);

import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import {
  LeadSourceEntity,
  LeadSourceTypeEnum,
} from '../db/entities/lead-source.entity';

export const seedLeadSources = async (dataSource: DataSource) => {
  const leadSourceRepo = dataSource.getRepository(LeadSourceEntity);

  const leadSources = Array.from({ length: 10 }).map(() => {
    const leadSource = new LeadSourceEntity();
    leadSource.name = faker.company.name();
    leadSource.type = faker.helpers.arrayElement(
      Object.values(LeadSourceTypeEnum),
    );
    leadSource.description = faker.lorem.sentence();
    leadSource.is_active = faker.datatype.boolean();
    return leadSource;
  });

  await leadSourceRepo.save(leadSources);
};

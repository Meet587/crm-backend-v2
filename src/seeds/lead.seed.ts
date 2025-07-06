import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import { LeadEntity, LeadStatusEnum } from '../db/entities/lead.entity';
import { PropertyEntity } from '../db/entities/property.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedLeads = async (dataSource: DataSource) => {
  const leadRepo = dataSource.getRepository(LeadEntity);
  const userRepo = dataSource.getRepository(UserEntity);
  const leadSourceRepo = dataSource.getRepository(LeadSourceEntity);
  const propertyRepo = dataSource.getRepository(PropertyEntity);

  const properties = await propertyRepo.find();
  const propertyIds = properties.map((property) => property.id);

  const users = await userRepo.find();
  const userIds = users.map((user) => user.id);

  const leadSources = await leadSourceRepo.find();
  const sourceIds = leadSources.map((source) => source.id);

  const leads = Array.from({ length: 50 }).map(() => {
    const lead = new LeadEntity();
    lead.first_name = faker.person.firstName();
    lead.last_name = faker.person.lastName();
    lead.email = faker.internet.email();
    lead.phone = faker.phone.number({ style: 'national' });
    lead.budget_min = faker.number.int({ min: 100000, max: 1000000 });
    lead.budget_max = faker.number.int({ min: 100000, max: 1000000 });
    lead.interested_property_id = faker.helpers.arrayElement(propertyIds);
    lead.status = faker.helpers.arrayElement(Object.values(LeadStatusEnum));
    lead.assigned_to = faker.helpers.arrayElement(userIds);
    lead.source_id = faker.helpers.arrayElement(sourceIds);
    return lead;
  });

  await leadRepo.save(leads);
};

import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import {
  LeadEntity,
  LeadSourceEnum,
  LeadStatusEnum,
} from '../db/entities/lead.entity';

export const seedLeads = async (dataSource: DataSource) => {
  const leadRepo = dataSource.getRepository(LeadEntity);

  const leads = Array.from({ length: 50 }).map(() => {
    const lead = new LeadEntity();
    lead.first_name = faker.person.firstName();
    lead.last_name = faker.person.lastName();
    lead.email = faker.internet.email();
    lead.phone = faker.phone.number({ style: 'national' });
    lead.source = faker.helpers.arrayElement(Object.values(LeadSourceEnum));
    lead.status = faker.helpers.arrayElement(Object.values(LeadStatusEnum));
    lead.notes = faker.lorem.paragraph();
    // lead.assigned_agent_id = faker.helpers.arrayElement(
    //   Object.values(UserEntity),
    // );
    return lead;
  });

  await leadRepo.save(leads);
};

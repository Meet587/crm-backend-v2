import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { DealEntity } from '../db/entities/deal.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { PropertyEntity } from '../db/entities/property.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedDeals = async (dataSource: DataSource) => {
  const dealRepo = dataSource.getRepository(DealEntity);
  const leadRepo = dataSource.getRepository(LeadEntity);
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  const leads = await leadRepo.find();
  const leadIds = leads.map((lead) => lead.id);

  const properties = await propertyRepo.find();
  const propertyIds = properties.map((property) => property.id);

  const users = await userRepo.find();
  const userIds = users.map((user) => user.id);

  const deals = Array.from({ length: 30 }).map(() => {
    const deal = new DealEntity();
    deal.lead_id = faker.helpers.arrayElement(leadIds);
    deal.property_id = faker.helpers.arrayElement(propertyIds);
    deal.rm_id = faker.helpers.arrayElement(userIds);
    return deal;
  });

  await dealRepo.save(deals);
};

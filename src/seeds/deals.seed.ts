import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { DealEntity, DealStatusEnum } from '../db/entities/deal.entity';
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

    // Set relationships
    if (leads.length > 0) {
      deal.lead = faker.helpers.arrayElement(leads);
    }
    if (properties.length > 0) {
      deal.property = faker.helpers.arrayElement(properties);
    }
    if (users.length > 0) {
      deal.rm = faker.helpers.arrayElement(users);
    }

    deal.client_name = faker.person.fullName();
    deal.client_phone = faker.phone.number({ style: 'national' });
    deal.client_email = faker.internet.email();
    deal.deal_amount = faker.number.int({ min: 100000, max: 1000000 });
    deal.commission_amount = faker.number.int({ min: 100000, max: 1000000 });
    deal.commission_percentage = faker.number.int({ min: 1, max: 10 });
    deal.possession_date = faker.date.future();
    deal.deal_date = faker.date.recent();
    deal.status = faker.helpers.arrayElement(Object.values(DealStatusEnum));
    return deal;
  });

  await dealRepo.save(deals);
};

import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { ClientEntity } from '../db/entities/client.entity';
import { DealEntity, DealStageEnum } from '../db/entities/deal.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { PropertyEntity } from '../db/entities/property.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedDeals = async (dataSource: DataSource) => {
  const dealRepo = dataSource.getRepository(DealEntity);
  const leadRepo = dataSource.getRepository(LeadEntity);
  const clientRepo = dataSource.getRepository(ClientEntity);
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  const leads = await leadRepo.find();
  const leadIds = leads.map((lead) => lead.id);

  const clients = await clientRepo.find();
  const clientIds = clients.map((client) => client.id);

  const properties = await propertyRepo.find();
  const propertyIds = properties.map((property) => property.id);

  const users = await userRepo.find();
  const userIds = users.map((user) => user.id);

  const deals = Array.from({ length: 30 }).map(() => {
    const deal = new DealEntity();
    deal.title = faker.lorem.sentence();
    deal.value = faker.number.int({ min: 100000, max: 1000000 });
    deal.stage = faker.helpers.arrayElement(Object.values(DealStageEnum));
    deal.probability = faker.number.int({ min: 0, max: 100 });
    deal.expected_close_date = faker.date.future();
    deal.notes = faker.lorem.paragraph();
    deal.lead_id = faker.helpers.arrayElement(leadIds);
    // deal.client_id = faker.helpers.arrayElement(clientIds);
    deal.property_id = faker.helpers.arrayElement(propertyIds);
    deal.agent_id = faker.helpers.arrayElement(userIds);
    return deal;
  });

  await dealRepo.save(deals);
};

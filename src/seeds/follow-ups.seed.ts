import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { ClientEntity } from '../db/entities/client.entity';
import {
  FollowUpEntity,
  FollowUpStatusEnum,
  FollowUpTypeEnum,
} from '../db/entities/follow-up.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedFollowUps = async (dataSource: DataSource) => {
  const followUpRepo = dataSource.getRepository(FollowUpEntity);
  const leadRepo = dataSource.getRepository(LeadEntity);
  const clientRepo = dataSource.getRepository(ClientEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  const leads = await leadRepo.find();
  const leadIds = leads.map((lead) => lead.id);

  const clients = await clientRepo.find();
  const clientIds = clients.map((client) => client.id);

  const users = await userRepo.find();
  const userIds = users.map((user) => user.id);

  const followUps = Array.from({ length: 30 }).map(() => {
    const followUp = new FollowUpEntity();
    followUp.lead_id = faker.helpers.arrayElement(leadIds);
    followUp.client_id = faker.helpers.arrayElement(clientIds);
    followUp.agent_id = faker.helpers.arrayElement(userIds);
    followUp.type = faker.helpers.arrayElement(Object.values(FollowUpTypeEnum));
    followUp.status = faker.helpers.arrayElement(
      Object.values(FollowUpStatusEnum),
    );
    followUp.follow_up_date = faker.date.future();
    followUp.notes = faker.lorem.paragraph();
    return followUp;
  });

  await followUpRepo.save(followUps);
};

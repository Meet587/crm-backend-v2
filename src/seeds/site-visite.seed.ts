import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { ClientEntity } from '../db/entities/client.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { PropertyEntity } from '../db/entities/property.entity';
import {
  InterestLevel,
  SiteVisitEntity,
  SiteVisitStatusEnum,
} from '../db/entities/site-visit.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedSiteVisits = async (dataSource: DataSource) => {
  const siteVisitRepo = dataSource.getRepository(SiteVisitEntity);
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

  const siteVisits = Array.from({ length: 30 }).map(() => {
    const siteVisit = new SiteVisitEntity();
    siteVisit.lead_id = faker.helpers.arrayElement(leadIds);
    siteVisit.client_id = faker.helpers.arrayElement(clientIds);
    siteVisit.agent_id = faker.helpers.arrayElement(userIds);
    siteVisit.property_id = faker.helpers.arrayElement(propertyIds);
    siteVisit.status = faker.helpers.arrayElement(
      Object.values(SiteVisitStatusEnum),
    );
    siteVisit.visit_date = faker.date.future();
    siteVisit.interest_level = faker.helpers.arrayElement(
      Object.values(InterestLevel),
    );
    siteVisit.notes = faker.lorem.paragraph();
    return siteVisit;
  });

  await siteVisitRepo.save(siteVisits);
};

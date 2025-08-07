import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import {
  ActivityStatusEnum,
  ActivityTypeEnum,
  LeadActivityEntity,
} from '../db/entities/lead-activity.entity';
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { PropertyEntity } from '../db/entities/property.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedLeadActivities = async (dataSource: DataSource) => {
  const leadActivityRepo = dataSource.getRepository(LeadActivityEntity);
  const userRepo = dataSource.getRepository(UserEntity);
  const leadSourceRepo = dataSource.getRepository(LeadSourceEntity);
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const leadRepo = dataSource.getRepository(LeadEntity);

  const properties = await propertyRepo.find();
  const propertyIds = properties.map((property) => property.id);

  const users = await userRepo.find();
  const userIds = users.map((user) => user.id);

  const leadSources = await leadSourceRepo.find();
  const sourceIds = leadSources.map((source) => source.id);

  const leads = await leadRepo.find();
  const leadIds = leads.map((lead) => lead.id);

  const leadActivities = Array.from({ length: 50 }).map(() => {
    const leadActivity = new LeadActivityEntity();
    leadActivity.lead_id = faker.helpers.arrayElement(leadIds);
    leadActivity.created_by = faker.helpers.arrayElement(userIds);
    leadActivity.activity_type = faker.helpers.arrayElement(
      Object.values(ActivityTypeEnum),
    );
    leadActivity.status = faker.helpers.arrayElement(
      Object.values(ActivityStatusEnum),
    );
    leadActivity.scheduled_at = faker.date.recent();
    leadActivity.completed_at = faker.date.recent();
    leadActivity.description = faker.lorem.sentence();
    leadActivity.master_comment = faker.lorem.sentence();

    return leadActivity;
  });

  await leadActivityRepo.save(leadActivities);
};

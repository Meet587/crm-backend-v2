import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import {
  BuilderEntity,
  BuilderStatusEnum,
} from '../db/entities/builder.entity';

export const seedBuilders = async (dataSource: DataSource) => {
  const builderRepo = dataSource.getRepository(BuilderEntity);

  const builders = Array.from({ length: 10 }).map(() => {
    const builder = new BuilderEntity();
    builder.name = faker.company.name();
    builder.contact_person = faker.person.fullName();
    builder.email = faker.internet.email();
    builder.phone = faker.phone.number({ style: 'national' });
    builder.address = faker.location.streetAddress();
    builder.website = faker.internet.url();
    builder.status = faker.helpers.arrayElement(
      Object.values(BuilderStatusEnum),
    );
    return builder;
  });

  await builderRepo.save(builders);
};

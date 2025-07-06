import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { BuilderContactEntity } from '../db/entities/builder-contact.entity';
import { BuilderEntity } from '../db/entities/builder.entity';

export const seedBuilderContacts = async (dataSource: DataSource) => {
  const builderContactRepo = dataSource.getRepository(BuilderContactEntity);
  const builderRepo = dataSource.getRepository(BuilderEntity);

  const builders = await builderRepo.find();
  const builderIds = builders.map((builder) => builder.id);

  const builderContacts = Array.from({ length: 10 }).map(() => {
    const builderContact = new BuilderContactEntity();
    builderContact.builder_id = faker.helpers.arrayElement(builderIds);
    builderContact.name = faker.person.fullName();
    builderContact.designation = faker.person.jobTitle();
    builderContact.phone = faker.phone.number({ style: 'national' });
    builderContact.email = faker.internet.email();
    return builderContact;
  });

  await builderContactRepo.save(builderContacts);
};

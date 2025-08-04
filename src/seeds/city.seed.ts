import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { BuilderContactEntity } from '../db/entities/builder-contact.entity';

import { BuilderEntity, BuilderStatusEnum } from 'src/db/entities/builder.entity';
import { CityEntity } from '../db/entities/city.entity';

export const seedBuilders = async (dataSource: DataSource) => {
  const cityRepo = dataSource.getRepository(CityEntity);
  const builderRepo = dataSource.getRepository(BuilderEntity);

  const cities = await cityRepo.find();
  const cityIds = cities.map((city) => city.id);

  const builders = Array.from({ length: 10 }).map(() => {
    const builder = new BuilderEntity();
    builder.name = faker.company.name();
    builder.phone = faker.phone.number({ style: 'national' });
    builder.email = faker.internet.email();
    builder.website = faker.internet.url();
    builder.address = {
      address_line_1: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      city_id: faker.helpers.arrayElement(cityIds),
    };
    builder.contact_persons = [new BuilderContactEntity()];
    builder.status = faker.helpers.arrayElement(
      Object.values(BuilderStatusEnum),
    );
    return builder;
  });

  await builderRepo.save(builders);
};

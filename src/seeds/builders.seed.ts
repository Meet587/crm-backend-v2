import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { BuilderContactEntity } from '../db/entities/builder-contact.entity';
import {
  BuilderEntity,
  BuilderStatusEnum,
} from '../db/entities/builder.entity';
import { CityEntity } from '../db/entities/city.entity';

export const seedBuilders = async (dataSource: DataSource) => {
  const builderRepo = dataSource.getRepository(BuilderEntity);
  const cityRepo = dataSource.getRepository(CityEntity);

  const cities = await cityRepo.find();
  const cityIds = cities.map((city) => city.id);

  const builders = Array.from({ length: 10 }).map(() => {
    const builder = new BuilderEntity();
    builder.name = faker.company.name();
    builder.address = faker.location.streetAddress();
    builder.city_id = faker.helpers.arrayElement(cityIds);
    builder.phone = faker.phone.number({ style: 'national' });
    builder.email = faker.internet.email();
    builder.website = faker.internet.url();
    builder.commission_rate = faker.number.int({ min: 1, max: 10 });
    builder.contact_persons = [new BuilderContactEntity()];
    builder.status = faker.helpers.arrayElement(
      Object.values(BuilderStatusEnum),
    );
    return builder;
  });

  await builderRepo.save(builders);
};

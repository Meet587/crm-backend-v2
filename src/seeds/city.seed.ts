import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

import { CityEntity } from '../db/entities/city.entity';

export const seedCities = async (dataSource: DataSource) => {
  const cityRepo = dataSource.getRepository(CityEntity);

  const cities = Array.from({ length: 10 }).map(() => {
    const city = new CityEntity();
    city.name = faker.location.city();
    city.state = faker.location.state();
    city.country = faker.location.country();
    city.pincode = faker.location.zipCode();
    return city;
  });

  await cityRepo.save(cities);
};

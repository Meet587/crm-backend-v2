import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { BuilderEntity } from '../db/entities/builder.entity';
import {
  PropertyEntity,
  PropertyStatusEnum,
  PropertyTypeEnum,
} from '../db/entities/property.entity';

export const seedProperties = async (dataSource: DataSource) => {
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const builderRepo = dataSource.getRepository(BuilderEntity);

  const builders = await builderRepo.find();
  const builderIds = builders.map((builder) => builder.id);

  const properties = Array.from({ length: 35 }).map(() => {
    const property = new PropertyEntity();
    property.name = faker.company.name();
    property.address = faker.location.streetAddress();
    property.city = faker.location.city();
    property.state = faker.location.state();
    property.zip_code = faker.location.zipCode();
    property.type = faker.helpers.arrayElement(Object.values(PropertyTypeEnum));
    property.status = faker.helpers.arrayElement(
      Object.values(PropertyStatusEnum),
    );
    property.price = faker.number.int({ min: 100000, max: 1000000 });
    property.bedrooms = faker.number.int({ min: 1, max: 5 });
    property.bathrooms = faker.number.int({ min: 1, max: 5 });
    property.square_footage = faker.number.int({ min: 1000, max: 10000 });
    property.lot_size = faker.number.int({ min: 1000, max: 10000 });
    property.year_built = faker.number.int({ min: 1900, max: 2025 });
    property.description = faker.lorem.paragraph();
    property.image_url = faker.image.url();
    property.builder_id = faker.helpers.arrayElement(builderIds);
    return property;
  });

  await propertyRepo.save(properties);
};

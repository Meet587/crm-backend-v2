import { faker } from '@faker-js/faker';
import { PropertyTypeEnum } from 'src/db/entities/project.enums';
import { DataSource } from 'typeorm';
import { ProjectEntity } from '../db/entities/project.entity';
import {
  PropertyEntity,
  PropertyStatusEnum,
  SizeUnitEnum,
} from '../db/entities/property.entity';

export const seedProperties = async (dataSource: DataSource) => {
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const projectRepo = dataSource.getRepository(ProjectEntity);

  const projects = await projectRepo.find();
  const projectIds = projects.map((project) => project.id);

  const propertyTypes = Object.values(PropertyTypeEnum);
  const sizeUnits = Object.values(SizeUnitEnum);
  const propertyStatuses = Object.values(PropertyStatusEnum);

  const properties = Array.from({ length: 35 }).map(() => {
    const property = new PropertyEntity();
    property.project_id = faker.helpers.arrayElement(projectIds);
    property.property_type = faker.helpers.arrayElement(propertyTypes);
    property.size = faker.number.int({ min: 100, max: 1000 });
    property.size_unit = faker.helpers.arrayElement(sizeUnits);
    property.bedrooms = faker.number.int({ min: 1, max: 5 });
    property.bathrooms = faker.number.int({ min: 1, max: 5 });
    property.floor_number = faker.number.int({ min: 1, max: 10 });
    property.price = faker.number.int({ min: 100000, max: 1000000 });
    property.status = faker.helpers.arrayElement(propertyStatuses);
    property.property_number = faker.string.alphanumeric(10);
    return property;
  });

  await propertyRepo.save(properties);
};

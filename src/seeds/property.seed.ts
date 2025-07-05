import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { PropertyEntity } from '../db/entities/property.entity';
import { ProjectEntity } from '../db/entities/project.entity';

export const seedProperties = async (dataSource: DataSource) => {
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const projectRepo = dataSource.getRepository(ProjectEntity);
  const projects = await projectRepo.find();
  const projectIds = projects.map((project) => project.id);

  const properties = Array.from({ length: 35 }).map(() => {
    const property = new PropertyEntity();
    property.project_id = faker.helpers.arrayElement(projectIds);
    return property;
  });

  await propertyRepo.save(properties);
};

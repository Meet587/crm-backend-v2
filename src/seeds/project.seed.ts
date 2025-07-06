import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { BuilderEntity } from '../db/entities/builder.entity';
import { CityEntity } from '../db/entities/city.entity';
import {
  ProjectEntity,
  ProjectStatusEnum,
} from '../db/entities/project.entity';

export const seedProjects = async (dataSource: DataSource) => {
  const projectRepo = dataSource.getRepository(ProjectEntity);
  const builderRepo = dataSource.getRepository(BuilderEntity);
  const cityRepo = dataSource.getRepository(CityEntity);

  const builders = await builderRepo.find();
  const builderIds = builders.map((builder) => builder.id);

  const cities = await cityRepo.find();
  const cityIds = cities.map((city) => city.id);

  const projects = Array.from({ length: 35 }).map(() => {
    const project = new ProjectEntity();
    project.builder_id = faker.helpers.arrayElement(builderIds);
    project.name = faker.company.name();
    project.description = faker.lorem.sentence();
    project.area = faker.location.city();
    project.city_id = faker.helpers.arrayElement(cityIds);
    project.launch_date = faker.date.recent();
    project.possession_date = faker.date.future();
    project.status = faker.helpers.arrayElement(
      Object.values(ProjectStatusEnum),
    );
    return project;
  });

  await projectRepo.save(projects);
};

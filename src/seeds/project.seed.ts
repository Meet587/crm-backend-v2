import { faker } from '@faker-js/faker';
import { AmenitiesEntity } from 'src/db/entities/amenities.entity';
import { DataSource } from 'typeorm';
import { BuilderEntity } from '../db/entities/builder.entity';
import { CityEntity } from '../db/entities/city.entity';
import { ProjectEntity } from '../db/entities/project.entity';

export const seedProjects = async (dataSource: DataSource) => {
  const projectRepo = dataSource.getRepository(ProjectEntity);
  const builderRepo = dataSource.getRepository(BuilderEntity);
  const cityRepo = dataSource.getRepository(CityEntity);
  const amenityRepo = dataSource.getRepository(AmenitiesEntity);

  const builders = await builderRepo.find();
  const builderIds = builders.map((builder) => builder.id);

  const cities = await cityRepo.find();
  const cityIds = cities.map((city) => city.id);

  const amenities = await amenityRepo.find();
  const amenityIds = amenities.map((amenity) => amenity.id);

  const projects = Array.from({ length: 35 }).map(() => {
    const project = new ProjectEntity();
    project.builder_id = faker.helpers.arrayElement(builderIds);
    project.name = faker.company.name();
    project.description = faker.lorem.sentence();
    project.city_id = faker.helpers.arrayElements(
      cityIds.map((id) => id.toString()),
    );
    project.amenities_ids = faker.helpers.arrayElements(
      amenityIds.map((id) => id.toString()),
    );
    project.possession_year = faker.number.int({ min: 2020, max: 2025 });

    return project;
  });

  await projectRepo.save(projects);
};

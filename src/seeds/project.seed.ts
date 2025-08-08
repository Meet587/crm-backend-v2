import { faker } from '@faker-js/faker';
import { PropertyTypeEnum } from 'src/db/entities/project.enums';
import { DataSource } from 'typeorm';
import { AmenitiesEntity } from '../db/entities/amenities.entity';
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
    project.property_types = faker.helpers.arrayElements(
      Object.values(PropertyTypeEnum),
      {
        min: 1,
        max: 3,
      },
    );

    // Select random cities for the many-to-many relationship
    const selectedCityIds = faker.helpers.arrayElements(cityIds, {
      min: 1,
      max: 3,
    });
    const selectedCities = cities.filter((city) =>
      selectedCityIds.includes(city.id),
    );
    project.cities = selectedCities;

    // Also populate the city_id array for backward compatibility
    project.city_id = selectedCityIds;

    // Select random amenities
    const selectedAmenityIds = faker.helpers.arrayElements(amenityIds, {
      min: 3,
      max: 8,
    });
    const selectedAmenities = amenities.filter((amenity) =>
      selectedAmenityIds.includes(amenity.id),
    );
    project.amenities = selectedAmenities;
    project.amenities_ids = selectedAmenityIds;

    project.possession_year = faker.number.int({ min: 2020, max: 2027 });

    return project;
  });

  await projectRepo.save(projects);
};

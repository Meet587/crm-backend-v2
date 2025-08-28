import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { ProjectEntity } from '../db/entities/project.entity';
import {
  AreaUnitEnum,
  PropertySubtypeEnum,
  PropertyUnitTypeEnum,
} from '../db/entities/project.enums';
import { ResidentialUnitEntity } from '../db/entities/residential-unit.entity';

export const seedResidentialUnits = async (dataSource: DataSource) => {
  const residentialUnitRepo = dataSource.getRepository(ResidentialUnitEntity);
  const projectRepo = dataSource.getRepository(ProjectEntity);

  // Get all projects
  const projects = await projectRepo.find();

  if (projects.length === 0) {
    console.log('No projects found. Please seed projects first.');
    return;
  }

  const residentialUnits: ResidentialUnitEntity[] = [];
  const residentialSubtypes = [
    PropertySubtypeEnum.APARTMENT_FLAT,
    PropertySubtypeEnum.BUNGALOW_VILLA,
    PropertySubtypeEnum.INDUSTRIAL_SHED,
    PropertySubtypeEnum.OFFICE_SPACE,
    PropertySubtypeEnum.LAND_PLOT,
    PropertySubtypeEnum.ROW_HOUSE,
    PropertySubtypeEnum.SHOP_SHOWROOM,
    PropertySubtypeEnum.WAREHOUSE,
  ];

  // Unit type configurations with bedroom/bathroom ranges and area ranges
  const unitConfigs = [
    {
      type: PropertyUnitTypeEnum.RK1,
      bedrooms: [0],
      bathrooms: [1],
      areaRange: { min: 200, max: 400 },
    },
    {
      type: PropertyUnitTypeEnum.BHK1,
      bedrooms: [1],
      bathrooms: [1, 2],
      areaRange: { min: 300, max: 600 },
    },
    {
      type: PropertyUnitTypeEnum.BHK2,
      bedrooms: [2],
      bathrooms: [2, 3],
      areaRange: { min: 600, max: 1200 },
    },
    {
      type: PropertyUnitTypeEnum.BHK3,
      bedrooms: [3],
      bathrooms: [2, 3, 4],
      areaRange: { min: 1000, max: 2000 },
    },
    {
      type: PropertyUnitTypeEnum.BHK3_S,
      bedrooms: [4, 5, 6],
      bathrooms: [3, 4, 5],
      areaRange: { min: 1800, max: 5000 },
    },
  ];

  // Create residential units for each project
  for (const project of projects) {
    const unitsPerProject = faker.number.int({ min: 3, max: 10 });

    for (let i = 0; i < unitsPerProject; i++) {
      const config = faker.helpers.arrayElement(unitConfigs);
      const bedrooms = faker.helpers.arrayElement(config.bedrooms);
      const bathrooms = faker.helpers.arrayElement(config.bathrooms);
      const superBuiltUpArea = faker.number.float({
        min: config.areaRange.min,
        max: config.areaRange.max,
        fractionDigits: 2,
      });
      const carpetArea =
        superBuiltUpArea *
        faker.number.float({
          min: 0.7,
          max: 0.9,
          fractionDigits: 2,
        });
      const basicCostPerSqFt = faker.number.float({
        min: 1000,
        max: 10000,
        fractionDigits: 2,
      });

      const residentialUnit = new ResidentialUnitEntity();
      residentialUnit.project_id = project.id;
      residentialUnit.subtype = faker.helpers.arrayElement(residentialSubtypes);
      residentialUnit.floor_start = faker.number.int({ min: 0, max: 20 });
      residentialUnit.floor_end = residentialUnit.floor_start; // Single floor unit
      residentialUnit.unit_type = config.type;
      residentialUnit.bedrooms = bedrooms;
      residentialUnit.bathrooms = bathrooms;
      residentialUnit.super_build_up_area_sqFt = superBuiltUpArea;
      residentialUnit.carpet_area_sqFt = carpetArea;
      residentialUnit.basic_cost = basicCostPerSqFt;
      residentialUnit.total_cost = basicCostPerSqFt * carpetArea;
      residentialUnit.floor_plan_url = faker.image.url({
        width: 800,
        height: 600,
      });
      residentialUnit.inserted_area_unit = AreaUnitEnum.SQFT;

      residentialUnits.push(residentialUnit);
    }
  }

  await residentialUnitRepo.save(residentialUnits);
  console.log(`Seeded ${residentialUnits.length} residential units`);
};

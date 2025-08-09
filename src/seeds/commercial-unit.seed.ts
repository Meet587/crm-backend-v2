import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { CommercialUnitEntity } from '../db/entities/commercial-unit.entity';
import { ProjectEntity } from '../db/entities/project.entity';
import { AreaUnitEnum, PropertySubtypeEnum } from '../db/entities/project.enums';

export const seedCommercialUnits = async (dataSource: DataSource) => {
  const commercialUnitRepo = dataSource.getRepository(CommercialUnitEntity);
  const projectRepo = dataSource.getRepository(ProjectEntity);

  // Get all projects
  const projects = await projectRepo.find();

  if (projects.length === 0) {
    console.log('No projects found. Please seed projects first.');
    return;
  }

  const commercialUnits: CommercialUnitEntity[] = [];
  const commercialSubtypes = Object.values(PropertySubtypeEnum).filter(
    (type) => type !== PropertySubtypeEnum.APARTMENT_FLAT,
  );

  // Create 3-5 commercial units per project
  for (const project of projects) {
    const unitCount = faker.number.int({ min: 3, max: 5 });

    for (let i = 0; i < unitCount; i++) {
      const superBuiltUpArea = faker.number.float({ min: 500, max: 5000 });
      const carpetArea =
        superBuiltUpArea * faker.number.float({ min: 0.6, max: 0.9 });
      const basicCost = faker.number.float({ min: 3000, max: 15000 });

      const commercialUnit = new CommercialUnitEntity();
      commercialUnit.project_id = project.id;
      commercialUnit.subtype = faker.helpers.arrayElement(commercialSubtypes);
      commercialUnit.floor_start = faker.number.int({ min: 0, max: 5 });
      commercialUnit.floor_end =
        commercialUnit.floor_start + faker.number.int({ min: 1, max: 3 });
      commercialUnit.unit_type = `${commercialUnit.subtype} Unit ${i + 1}`;
      commercialUnit.super_build_up_area_sqFt = superBuiltUpArea;
      commercialUnit.carpet_area_sqFt = carpetArea;
      commercialUnit.basic_cost = basicCost;
      commercialUnit.total_cost = basicCost * carpetArea;
      commercialUnit.floor_plan_url = faker.image.url({
        width: 800,
        height: 600,
      });
      commercialUnit.inserted_area_unit = AreaUnitEnum.SQFT;

      commercialUnits.push(commercialUnit);
    }
  }

  await commercialUnitRepo.save(commercialUnits);
  console.log(`Seeded ${commercialUnits.length} commercial units`);
};

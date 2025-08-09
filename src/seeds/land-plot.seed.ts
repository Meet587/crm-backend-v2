import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { LandPlotEntity } from '../db/entities/land-plot.entity';
import { ProjectEntity } from '../db/entities/project.entity';
import { AreaUnitEnum, PropertySubtypeEnum } from '../db/entities/project.enums';

export const seedLandPlots = async (dataSource: DataSource) => {
  const landPlotRepo = dataSource.getRepository(LandPlotEntity);
  const projectRepo = dataSource.getRepository(ProjectEntity);

  // Get all projects
  const projects = await projectRepo.find();

  if (projects.length === 0) {
    console.log('No projects found. Please seed projects first.');
    return;
  }

  const landPlots: LandPlotEntity[] = [];
  const landSubtypes = [PropertySubtypeEnum.LAND_PLOT];

  // Create 2-4 land plots per project
  for (const project of projects) {
    const plotCount = faker.number.int({ min: 2, max: 4 });

    for (let i = 0; i < plotCount; i++) {
      const plotArea = faker.number.float({
        min: 1000,
        max: 10000,
        fractionDigits: 2,
      });
      const basicCostPerSqFt = faker.number.float({
        min: 100,
        max: 1000,
        fractionDigits: 2,
      });

      const landPlot = new LandPlotEntity();
      landPlot.project_id = project.id;
      landPlot.subtype = faker.helpers.arrayElement(landSubtypes);
      landPlot.unit_type = `${landPlot.subtype} ${i + 1}`;
      landPlot.super_build_up_area_sqFt = plotArea;
      landPlot.carpet_area_sqFt = plotArea; // Same as plot area for land
      landPlot.basic_cost = basicCostPerSqFt;
      landPlot.total_cost = basicCostPerSqFt * plotArea;
      landPlot.floor_plan_url = faker.image.url({
        width: 800,
        height: 600,
      });
      landPlot.inserted_area_unit = AreaUnitEnum.SQFT;

      landPlots.push(landPlot);
    }
  }

  await landPlotRepo.save(landPlots);
  console.log(`Seeded ${landPlots.length} land plots`);
};

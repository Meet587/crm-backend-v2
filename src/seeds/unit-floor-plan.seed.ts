import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { CommercialUnitEntity } from '../db/entities/commercial-unit.entity';
import { LandPlotEntity } from '../db/entities/land-plot.entity';
import { ResidentialUnitEntity } from '../db/entities/residential-unit.entity';
import { UnitFloorPlanEntity } from '../db/entities/unit-floor-plan.entity';

export const seedUnitFloorPlans = async (dataSource: DataSource) => {
  const floorPlanRepo = dataSource.getRepository(UnitFloorPlanEntity);
  const residentialUnitRepo = dataSource.getRepository(ResidentialUnitEntity);
  const commercialUnitRepo = dataSource.getRepository(CommercialUnitEntity);
  const landPlotRepo = dataSource.getRepository(LandPlotEntity);

  // Get all units that can have floor plans
  const residentialUnits = await residentialUnitRepo.find();
  const commercialUnits = await commercialUnitRepo.find();
  const landPlots = await landPlotRepo.find();

  const floorPlans: UnitFloorPlanEntity[] = [];

  // Create 1-3 floor plans for each residential unit
  for (const unit of residentialUnits) {
    const planCount = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < planCount; i++) {
      const floorPlan = new UnitFloorPlanEntity();
      floorPlan.name = `${unit.unit_type} Floor Plan ${i + 1}`;
      floorPlan.image_url = faker.image.url({
        width: 800,
        height: 600,
      });
      floorPlan.description = `Detailed floor plan for ${unit.unit_type} showing room dimensions and layout.`;
      floorPlan.residential_unit_id = unit.id;

      floorPlans.push(floorPlan);
    }
  }

  // Create 1-2 floor plans for each commercial unit
  for (const unit of commercialUnits) {
    const planCount = faker.number.int({ min: 1, max: 2 });

    for (let i = 0; i < planCount; i++) {
      const floorPlan = new UnitFloorPlanEntity();
      floorPlan.name = `${unit.unit_type} Floor Plan ${i + 1}`;
      floorPlan.image_url = faker.image.url({
        width: 800,
        height: 600,
      });
      floorPlan.description = `Floor plan for ${unit.unit_type} showing office/retail space layout.`;
      floorPlan.commercial_unit_id = unit.id;

      floorPlans.push(floorPlan);
    }
  }

  // Create 1 floor plan for each land plot
  for (const plot of landPlots) {
    const floorPlan = new UnitFloorPlanEntity();
    floorPlan.name = `${plot.unit_type} Site Plan`;
    floorPlan.image_url = faker.image.url({
      width: 800,
      height: 600,
    });
    floorPlan.description = `Site plan for ${plot.unit_type} showing plot dimensions and boundaries.`;
    floorPlan.land_plot_id = plot.id;

    floorPlans.push(floorPlan);
  }

  await floorPlanRepo.save(floorPlans);
  console.log(`Seeded ${floorPlans.length} unit floor plans`);
};

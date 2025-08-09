import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../db/datasource-options';
import { seedAmenities } from './amenities.seed';
import { seedBuilderContacts } from './builder-contact.seed';
import { seedBuilders } from './builders.seed';
import { seedCities } from './city.seed';
import { seedCommercialUnits } from './commercial-unit.seed';
import { seedCommissions } from './commission.seed';
import { seedDeals } from './deals.seed';
import { seedLandPlots } from './land-plot.seed';
import { seedLeadActivities } from './lead-activity.seed';
import { seedLeadAssignmentHistory } from './lead-assignment-history.seed';
import { seedLeadSources } from './lead-source.seed';
import { seedLeadStatusHistory } from './lead-status-history.seed';
import { seedLeads } from './lead.seed';
import { seedProjects } from './project.seed';
import { seedProperties } from './property.seed';
import { seedResidentialUnits } from './residential-unit.seed';
import { seedUnitFloorPlans } from './unit-floor-plan.seed';
import { seedUsers } from './user.seed';
import { seedPropertyPricing } from './property-pricing.seed';
import { seedPropertyExtraCharges } from './property-extra-charge.seed';
import { seedPropertyFurniture } from './property-furniture.seed';
import { seedPropertyUploads } from './property-upload.seed';

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(async () => {
    console.log('Seeding data...');

    // Seed users first as they're referenced by other entities
    const users = await seedUsers(dataSource);

    // Seed reference data
    await seedCities(dataSource);
    await seedLeadSources(dataSource);
    await seedAmenities(dataSource);

    // Seed builders and their contacts
    const builders = await seedBuilders(dataSource);
    await seedBuilderContacts(dataSource);

    // Seed projects and properties
    const projects = await seedProjects(dataSource);
    await seedProperties(dataSource);

    // Seed property-related data
    await seedPropertyPricing(dataSource);
    await seedPropertyExtraCharges(dataSource);
    await seedPropertyFurniture(dataSource);
    await seedPropertyUploads(dataSource);

    // Seed property units
    await seedResidentialUnits(dataSource);
    await seedCommercialUnits(dataSource);
    await seedLandPlots(dataSource);
    await seedUnitFloorPlans(dataSource);

    // Seed leads and related data
    const leads = await seedLeads(dataSource);
    await seedLeadActivities(dataSource);
    await seedLeadStatusHistory(dataSource);
    await seedLeadAssignmentHistory(dataSource);

    // Seed deals and commissions
    const deals = await seedDeals(dataSource);
    await seedCommissions(dataSource);

    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding', error);
    process.exit(1);
  });

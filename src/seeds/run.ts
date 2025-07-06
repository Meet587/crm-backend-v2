import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../db/datasource-options';
import { seedBuilderContacts } from './builder-contact.seed';
import { seedBuilders } from './builders.seed';
import { seedCommissions } from './commission.seed';
import { seedDeals } from './deals.seed';
import { seedLeadActivities } from './lead-activityseed';
import { seedLeads } from './lead.seed';
import { seedProjects } from './project.seed';
import { seedProperties } from './property.seed';

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(async () => {
    console.log('Seeding data...');
    await seedBuilders(dataSource);
    await seedBuilderContacts(dataSource);
    // await seedLeadSources(dataSource);
    await seedProjects(dataSource);
    await seedProperties(dataSource);
    await seedLeads(dataSource);
    await seedLeadActivities(dataSource);
    await seedDeals(dataSource);
    await seedCommissions(dataSource);
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding', error);
    process.exit(1);
  });

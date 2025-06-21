import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../db/datasource-options';

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(async () => {
    console.log('Seeding data... commented.');
    // await seedLeads(dataSource);
    // await seedBuilders(dataSource);
    // await seedProperties(dataSource);
    // await seedDeals(dataSource);
    // await seedFollowUps(dataSource);
    // await seedSiteVisits(dataSource);
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding', error);
    process.exit(1);
  });

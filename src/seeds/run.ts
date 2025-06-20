import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../db/datasource-options';
import { seedLeads } from './lead.seed';

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(async () => {
    console.log('Seeding data...');
    await seedLeads(dataSource);
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding', error);
    process.exit(1);
  });

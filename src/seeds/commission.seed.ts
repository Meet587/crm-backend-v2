import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { BuilderEntity } from '../db/entities/builder.entity';
import {
  CommissionEntity,
  CommissionStatusEnum,
} from '../db/entities/commission.entity';
import { DealEntity } from '../db/entities/deal.entity';

export const seedCommissions = async (dataSource: DataSource) => {
  const commissionRepo = dataSource.getRepository(CommissionEntity);
  const dealRepo = dataSource.getRepository(DealEntity);
  const builderRepo = dataSource.getRepository(BuilderEntity);

  const deals = await dealRepo.find();
  const dealIds = deals.map((deal) => deal.id);

  const builders = await builderRepo.find();
  const builderIds = builders.map((builder) => builder.id);

  const commissions = Array.from({ length: 30 }).map(() => {
    const commission = new CommissionEntity();
    commission.deal_id = faker.helpers.arrayElement(dealIds);
    commission.builder_id = faker.helpers.arrayElement(builderIds);
    commission.amount = faker.number.int({ min: 100000, max: 1000000 });
    commission.percentage = faker.number.int({ min: 1, max: 10 });
    commission.expected_date = faker.date.recent();
    commission.received_date = faker.date.recent();
    commission.notes = faker.lorem.sentence();
    commission.status = faker.helpers.arrayElement(
      Object.values(CommissionStatusEnum),
    );
    return commission;
  });

  await commissionRepo.save(commissions);
};

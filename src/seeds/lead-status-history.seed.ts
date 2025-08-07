import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { LeadStatusHistoryEntity } from '../db/entities/lead-status-history.entity';
import { LeadEntity, LeadStatusEnum } from '../db/entities/lead.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedLeadStatusHistory = async (dataSource: DataSource) => {
  const statusHistoryRepo = dataSource.getRepository(LeadStatusHistoryEntity);
  const leadRepo = dataSource.getRepository(LeadEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  // Get all leads and users
  const leads = await leadRepo.find();
  const users = await userRepo.find();

  if (leads.length === 0 || users.length === 0) {
    console.log('No leads or users found. Please seed leads and users first.');
    return;
  }

  const statusHistory: LeadStatusHistoryEntity[] = [];
  const statuses = Object.values(LeadStatusEnum);
  const userIds = users.map((user) => user.id);

  // Create status history for each lead
  for (const lead of leads) {
    // Each lead has 1-5 status history entries
    const historyCount = faker.number.int({ min: 1, max: 5 });
    let currentStatusIndex = 0;
    let statusDate = faker.date.recent({ days: 60 }); // Start with a date up to 60 days ago

    for (let i = 0; i < historyCount; i++) {
      // Move to next status, but don't go beyond the last status
      currentStatusIndex = Math.min(
        currentStatusIndex + faker.number.int({ min: 0, max: 1 }),
        statuses.length - 1,
      );
      const status = statuses[currentStatusIndex];

      const statusHistoryEntry = new LeadStatusHistoryEntity();
      statusHistoryEntry.lead_id = lead.id;
      statusHistoryEntry.status = status;
      statusHistoryEntry.changed_at = faker.date.recent({ days: 60 });

      // Add some notes for the status change
      const notes = [
        `Status changed to ${status}`,
        `Customer ${status} - ${faker.lorem.sentence()}`,
        `Follow up required: ${faker.lorem.sentence()}`,
        `Next steps: ${faker.lorem.words(5)}`,
        `Internal notes: ${faker.lorem.sentence()}`,
      ];

      // Set status change time (incrementing by 1-5 days)
      statusDate = faker.date.soon({
        days: faker.number.int({ min: 1, max: 5 }),
        refDate: statusDate,
      });
      statusHistoryEntry.changed_at = statusDate;

      statusHistory.push(statusHistoryEntry);

      // If we've reached the last status, break the loop
      if (currentStatusIndex === statuses.length - 1) break;
    }
  }

  // Sort all status changes by date to ensure proper history
  statusHistory.sort((a, b) => a.changed_at.getTime() - b.changed_at.getTime());

  await statusHistoryRepo.save(statusHistory);
  console.log(`Seeded ${statusHistory.length} lead status history records`);
};

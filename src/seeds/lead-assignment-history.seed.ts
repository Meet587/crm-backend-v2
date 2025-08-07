import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { LeadAssignmentHistoryEntity } from '../db/entities/lead-assignment-history.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedLeadAssignmentHistory = async (dataSource: DataSource) => {
  const assignmentHistoryRepo = dataSource.getRepository(
    LeadAssignmentHistoryEntity,
  );
  const leadRepo = dataSource.getRepository(LeadEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  // Get all leads and users
  const leads = await leadRepo.find();
  const users = await userRepo.find();

  if (leads.length === 0 || users.length === 0) {
    console.log('No leads or users found. Please seed leads and users first.');
    return;
  }

  const assignmentHistory: LeadAssignmentHistoryEntity[] = [];
  const userIds = users.map((user) => user.id);

  // Create assignment history for each lead
  for (const lead of leads) {
    // Each lead has 1-3 assignment history entries
    const historyCount = faker.number.int({ min: 1, max: 3 });
    let previousAssignments = new Set<string>();

    for (let i = 0; i < historyCount; i++) {
      // Get a user that hasn't been assigned to this lead yet
      const availableUsers = users.filter(
        (user) => !previousAssignments.has(user.id),
      );
      if (availableUsers.length === 0) break;

      const assignedUser = faker.helpers.arrayElement(availableUsers);
      previousAssignments.add(assignedUser.id);

      const assignment = new LeadAssignmentHistoryEntity();
      assignment.lead_id = lead.id;
      assignment.assigned_to = assignedUser.id;

      // Set assignment date to a date between now and 30 days ago
      assignment.assigned_at = faker.date.recent({ days: 30 });

      assignmentHistory.push(assignment);
    }
  }

  // Sort assignments by date (oldest first) to ensure proper history
  assignmentHistory.sort(
    (a, b) => a.assigned_at.getTime() - b.assigned_at.getTime(),
  );

  await assignmentHistoryRepo.save(assignmentHistory);
  console.log(
    `Seeded ${assignmentHistory.length} lead assignment history records`,
  );
};

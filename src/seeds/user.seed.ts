import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { UserEntity, UserRoleEnum } from '../db/entities/user.entity';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepo = dataSource.getRepository(UserEntity);

  // Check if users already exist
  const existingUsers = await userRepo.find();
  if (existingUsers.length > 0) {
    console.log('Users already seeded');
    return;
  }

  const users: UserEntity[] = [];
  const passwordHash = await bcrypt.hash('password123', 10); // Default password for all seeded users

  // Create admin user
  const admin = new UserEntity();
  admin.email = 'admin@example.com';
  admin.password_hash = passwordHash;
  admin.first_name = 'Admin';
  admin.last_name = 'User';
  admin.phone = faker.phone.number({ style: 'national' });
  admin.role = UserRoleEnum.ADMIN;
  admin.is_active = true;
  admin.last_login = faker.date.recent({ days: 7 });
  users.push(admin);

  // Create 2 RMs (Relationship Managers)
  for (let i = 0; i < 2; i++) {
    const rm = new UserEntity();
    rm.email = `rm${i + 1}@example.com`;
    rm.password_hash = passwordHash;
    rm.first_name = faker.person.firstName();
    rm.last_name = faker.person.lastName();
    rm.phone = faker.phone.number({ style: 'national' });
    rm.role = UserRoleEnum.RM;
    rm.is_active = true;
    rm.last_login = faker.date.recent({ days: 14 });
    users.push(rm);
  }

  // Create 5 back office users
  for (let i = 0; i < 5; i++) {
    const backOffice = new UserEntity();
    backOffice.email = `backoffice${i + 1}@example.com`;
    backOffice.password_hash = passwordHash;
    backOffice.first_name = faker.person.firstName();
    backOffice.last_name = faker.person.lastName();
    backOffice.phone = faker.phone.number({ style: 'national' });
    backOffice.role = UserRoleEnum.BACK_OFFICE;
    backOffice.is_active = i < 4; // Make one user inactive
    backOffice.last_login = faker.date.recent({ days: 30 });
    users.push(backOffice);
  }

  // Create 10 agents
  for (let i = 0; i < 10; i++) {
    const agent = new UserEntity();
    agent.email = `agent${i + 1}@example.com`;
    agent.password_hash = passwordHash;
    agent.first_name = faker.person.firstName();
    agent.last_name = faker.person.lastName();
    agent.phone = faker.phone.number({ style: 'national' });
    agent.role = UserRoleEnum.AGENT;
    agent.is_active = i < 8; // Make 2 agents inactive
    agent.last_login = faker.date.recent({ days: 30 });
    users.push(agent);
  }

  await userRepo.save(users);
  console.log(`Seeded ${users.length} users`);

  return users; // Return users for use in other seeders
};

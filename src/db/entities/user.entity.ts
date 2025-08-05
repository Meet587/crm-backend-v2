import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealEntity } from './deal.entity';
import { LeadActivityEntity } from './lead-activity.entity';
import { LeadAssignmentHistoryEntity } from './lead-assignment-history.entity';
import { LeadEntity } from './lead.entity';

export enum UserRoleEnum {
  ADMIN = 'admin',
  RM = 'rm',
  BACK_OFFICE = 'back_office',
  AGENT = 'agent',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password_hash: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.BACK_OFFICE,
  })
  role: UserRoleEnum;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(() => LeadEntity, (lead) => lead.assigned_to)
  assigned_leads: LeadEntity[];

  @OneToMany(() => LeadActivityEntity, (activity) => activity.created_by)
  lead_activities: LeadActivityEntity[];

  @OneToMany(() => DealEntity, (deal) => deal.rm)
  deals: DealEntity[];

  // TODO: Uncomment this when we have a way to store the assignment history
  @OneToMany(
    () => LeadAssignmentHistoryEntity,
    (assignment) => assignment.assigned_to_user,
  )
  assignment_history: LeadAssignmentHistoryEntity[];
}

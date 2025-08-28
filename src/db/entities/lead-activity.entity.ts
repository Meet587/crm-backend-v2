import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { LeadEntity } from './lead.entity';
import { UserEntity } from './user.entity';

export enum ActivityTypeEnum {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  SITE_VISIT = 'site_visit',
  FOLLOW_UP = 'follow_up',
}

export enum ActivityStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('lead_activities')
@Index(['lead_id'])
@Index(['created_by'])
@Index(['status'])
export class LeadActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  lead_id: string;

  @Column({
    type: 'enum',
    enum: ActivityTypeEnum,
    default: ActivityTypeEnum.CALL,
  })
  activity_type: ActivityTypeEnum;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  master_comment: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduled_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @Column({ type: 'uuid', nullable: false })
  created_by: string;

  @Column({
    type: 'enum',
    enum: ActivityStatusEnum,
    default: ActivityStatusEnum.PENDING,
  })
  status: ActivityStatusEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => LeadEntity, (lead) => lead.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;

  @ManyToOne(() => UserEntity, (user) => user.lead_activities, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by' })
  created_by_user: UserEntity;
}
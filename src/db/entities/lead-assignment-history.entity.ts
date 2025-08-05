import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeadEntity } from './lead.entity';
import { UserEntity } from './user.entity';

@Entity('lead_assignment_history')
export class LeadAssignmentHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  lead_id: string;

  @Column({ type: 'uuid', nullable: false })
  assigned_to: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  assigned_at: Date;

  // Relationships
  @ManyToOne(() => LeadEntity, (lead) => lead.assignment_history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;

  @ManyToOne(() => UserEntity, (user) => user.assignment_history, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigned_to' })
  assigned_to_user: UserEntity;
}

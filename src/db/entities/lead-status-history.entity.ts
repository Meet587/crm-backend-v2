import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeadEntity } from './lead.entity';

@Entity('lead_status_history')
export class LeadStatusHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  lead_id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  status: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  changed_at: Date;

  // Relationships
  @ManyToOne(() => LeadEntity, (lead) => lead.status_history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;
}

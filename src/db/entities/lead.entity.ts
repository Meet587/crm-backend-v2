import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealEntity } from './deal.entity';
import { LeadActivityEntity } from './lead-activity.entity';
import { LeadSourceEntity } from './lead-source.entity';
import { PropertyEntity } from './property.entity';
import { UserEntity } from './user.entity';

export enum LeadStatusEnum {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  SITE_VISIT_SCHEDULED = 'site_visit_scheduled',
  SITE_VISIT_DONE = 'site_visit_done',
  NEGOTIATION = 'negotiation',
  PAPERWORK = 'paperwork',
  DEAL_CLOSED = 'deal_closed',
  DEAL_LOST = 'deal_lost',
}

@Entity('leads')
@Index(['phone'])
@Index(['status'])
@Index(['assigned_to'])
export class LeadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  source_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'uuid', nullable: true })
  interested_property_id: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  budget_min: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  budget_max: number;

  @Column({
    type: 'enum',
    enum: LeadStatusEnum,
    default: LeadStatusEnum.NEW,
  })
  status: LeadStatusEnum;

  @Column({ type: 'uuid', nullable: true })
  assigned_to: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => LeadSourceEntity, (source) => source.leads, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'source_id' })
  source: LeadSourceEntity;

  @ManyToOne(() => PropertyEntity, (property) => property.leads, {
    nullable: true,
  })
  @JoinColumn({ name: 'interested_property_id' })
  interested_property: PropertyEntity;

  @ManyToOne(() => UserEntity, (user) => user.assigned_leads, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigned_to' })
  assigned_to_user: UserEntity;

  @OneToMany(() => LeadActivityEntity, (activity) => activity.lead)
  activities: LeadActivityEntity[];

  @OneToMany(() => DealEntity, (deal) => deal.lead)
  deals: DealEntity[];

  // @OneToMany(() => LeadAssignmentHistoryEntity, (assignment) => assignment.lead)
  // assignment_history: LeadAssignmentHistoryEntity[];

  // @OneToMany(() => LeadStatusHistoryEntity, (status) => status.lead)
  // status_history: LeadStatusHistoryEntity[];

  // Virtual field for full name
  get full_name(): string {
    return `${this.first_name || ''} ${this.last_name || ''}`.trim();
  }
}

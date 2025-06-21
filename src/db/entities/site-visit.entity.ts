import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { LeadEntity } from './lead.entity';
import { PropertyEntity } from './property.entity';
import { UserEntity } from './user.entity';

export enum SiteVisitStatusEnum {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum InterestLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  NOT_INTERESTED = 'not_interested',
}

@Entity('site_visits')
export class SiteVisitEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LeadEntity, (lead) => lead.site_visits, { nullable: true })
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;

  @Column({ nullable: true })
  lead_id: string;

  @ManyToOne(() => ClientEntity, (client) => client.site_visits, {
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ nullable: true })
  client_id: string;

  @ManyToOne(() => PropertyEntity, (property) => property.site_visits)
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column()
  property_id: string;

  @ManyToOne(() => UserEntity, (user) => user.conducted_site_visits)
  @JoinColumn({ name: 'agent_id' })
  agent: UserEntity;

  @Column()
  agent_id: string;

  @Column({ type: 'timestamp' })
  visit_date: Date;

  @Column({
    type: 'enum',
    enum: SiteVisitStatusEnum,
    default: SiteVisitStatusEnum.SCHEDULED,
  })
  status: SiteVisitStatusEnum;

  @Column({ nullable: true })
  feedback: string;

  @Column({
    type: 'enum',
    enum: InterestLevel,
    nullable: true,
  })
  interest_level: InterestLevel;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

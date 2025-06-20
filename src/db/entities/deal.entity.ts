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

export enum DealStageEnum {
  INITIAL_CONTACT = 'initial_contact',
  NEEDS_ANALYSIS = 'needs_analysis',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CONTRACT = 'contract',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost',
}

@Entity('deals')
export class DealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  value: number;

  @Column({
    type: 'enum',
    enum: DealStageEnum,
    default: DealStageEnum.INITIAL_CONTACT,
  })
  stage: DealStageEnum;

  @Column({ type: 'int', default: 0 })
  probability: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  commission: number;

  @Column({ type: 'date', nullable: true })
  expected_close_date: Date;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => LeadEntity, (lead) => lead.deals, { nullable: true })
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;

  @Column({ nullable: true })
  lead_id: string;

  @ManyToOne(() => ClientEntity, (client) => client.deals, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ nullable: true })
  client_id: string;

  @ManyToOne(() => PropertyEntity, (property) => property.deals)
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column()
  property_id: string;

  @ManyToOne(() => UserEntity, (user) => user.deals)
  @JoinColumn({ name: 'agent_id' })
  agent: UserEntity;

  @Column()
  agent_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

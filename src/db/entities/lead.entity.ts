import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClientEntity } from './client.entity';
import { DealEntity } from './deal.entity';
import { FollowUpEntity } from './follow-up.entity';
import { SiteVisitEntity } from './site-visit.entity';
import { UserEntity } from './user.entity';

export enum LeadSourceEnum {
  WEBSITE = 'website',
  REFERRAL = 'referral',
  SOCIAL_MEDIA = 'social_media',
  COLD_CALL = 'cold_call',
  WALK_IN = 'walk_in',
}

export enum LeadStatusEnum {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  CONVERTED = 'converted',
  LOST = 'lost',
}

@Entity('leads')
export class LeadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: LeadSourceEnum,
    default: LeadSourceEnum.WEBSITE,
  })
  source: LeadSourceEnum;

  @Column({
    type: 'enum',
    enum: LeadStatusEnum,
    default: LeadStatusEnum.NEW,
  })
  status: LeadStatusEnum;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => UserEntity, (user) => user.assigned_leads)
  @JoinColumn({ name: 'assigned_agent_id' })
  assigned_agent: UserEntity;

  @Column({ nullable: true })
  assigned_agent_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => ClientEntity, (client) => client.original_lead)
  // @JoinColumn({ name: 'originalClientId' })
  converted_client: ClientEntity;

  @OneToMany(() => DealEntity, (deal) => deal.lead)
  deals: DealEntity[];

  @OneToMany(() => SiteVisitEntity, (siteVisit) => siteVisit.lead)
  site_visits: SiteVisitEntity[];

  @OneToMany(() => FollowUpEntity, (followUp) => followUp.lead)
  follow_ups: FollowUpEntity[];
}

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
import { UserEntity } from './user.entity';

export enum FollowUpTypeEnum {
  PHONE_CALL = 'phone_call',
  EMAIL = 'email',
  SMS = 'sms',
  IN_PERSON = 'in_person',
  WHATSAPP = 'whatsapp',
}

export enum FollowUpStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_RESPONSE = 'no_response',
}

@Entity('follow_ups')
export class FollowUpEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LeadEntity, (lead) => lead.follow_ups, { nullable: true })
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;

  @Column({ nullable: true })
  lead_id: string;

  @ManyToOne(() => ClientEntity, (client) => client.follow_ups, {
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ nullable: true })
  client_id: string;

  @ManyToOne(() => UserEntity, (user) => user.follow_ups)
  @JoinColumn({ name: 'agent_id' })
  agent: UserEntity;

  @Column()
  agent_id: string;

  @Column({
    type: 'enum',
    enum: FollowUpTypeEnum,
  })
  type: FollowUpTypeEnum;

  @Column({ type: 'timestamp' })
  follow_up_date: Date;

  @Column({
    type: 'enum',
    enum: FollowUpStatusEnum,
    default: FollowUpStatusEnum.PENDING,
  })
  status: FollowUpStatusEnum;

  @Column({ nullable: true })
  purpose: string;

  @Column({ nullable: true })
  outcome: string;

  @Column({ type: 'timestamp', nullable: true })
  next_follow_up_date: Date;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

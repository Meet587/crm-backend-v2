import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealEntity } from './deal.entity';
import { LeadEntity } from './lead.entity';

export enum ClientStatusEnumEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CONVERTED = 'converted',
}

@Entity('clients')
export class ClientEntity {
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

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  occupation: string; // TODO: enum

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget_min: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget_max: number;

  @Column({ nullable: true })
  preferred_location: string;

  @Column({
    type: 'enum',
    enum: ClientStatusEnumEnum,
    default: ClientStatusEnumEnum.ACTIVE,
  })
  status: ClientStatusEnumEnum;

  @Column({ nullable: true })
  notes: string;

  @OneToOne(() => LeadEntity, (lead) => lead.converted_client)
  @JoinColumn({ name: 'original_lead_id' })
  original_lead: LeadEntity;

  @Column({ nullable: true })
  original_lead_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => DealEntity, (deal) => deal.client)
  deals: DealEntity[];
}

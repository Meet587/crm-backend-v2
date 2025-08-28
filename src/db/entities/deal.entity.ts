import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { LeadEntity } from './lead.entity';
import { PropertyEntity } from './property.entity';
import { UserEntity } from './user.entity';
import { CommissionEntity } from './commission.entity';

export enum DealStatusEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity('deals')
@Index(['rm_id'])
@Index(['status'])
@Index(['deal_date'])
export class DealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  lead_id: string;

  @Column({ type: 'uuid', nullable: false })
  property_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  client_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  client_phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  client_email: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  deal_amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  commission_amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  commission_percentage: number;

  @Column({ type: 'date', nullable: false })
  deal_date: Date;

  @Column({ type: 'date', nullable: true })
  possession_date: Date;

  @Column({
    type: 'enum',
    enum: DealStatusEnum,
    default: DealStatusEnum.PENDING,
  })
  status: DealStatusEnum;

  @Column({ type: 'uuid', nullable: false })
  rm_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => LeadEntity, (lead) => lead.deals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lead_id' })
  lead: LeadEntity;

  @ManyToOne(() => PropertyEntity, (property) => property.deals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @ManyToOne(() => UserEntity, (user) => user.deals, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'rm_id' })
  rm: UserEntity;

  @OneToMany(() => CommissionEntity, (commission) => commission.deal)
  commissions: CommissionEntity[];
}
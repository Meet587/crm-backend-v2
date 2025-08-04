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
import { DealEntity } from './deal.entity';
import { BuilderEntity } from './builder.entity';

export enum CommissionStatusEnum {
  PENDING = 'pending',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

@Entity('commissions')
@Index(['builder_id'])
@Index(['status'])
@Index(['expected_date'])
export class CommissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  deal_id: string;

  @Column({ type: 'number', nullable: false })
  builder_id: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  percentage: number;

  @Column({
    type: 'enum',
    enum: CommissionStatusEnum,
    default: CommissionStatusEnum.PENDING,
  })
  status: CommissionStatusEnum;

  @Column({ type: 'date', nullable: true })
  expected_date: Date;

  @Column({ type: 'date', nullable: true })
  received_date: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => DealEntity, (deal) => deal.commissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'deal_id' })
  deal: DealEntity;

  @ManyToOne(() => BuilderEntity, (builder) => builder.commissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'builder_id' })
  builder: BuilderEntity;
}
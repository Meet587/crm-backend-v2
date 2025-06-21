import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuilderEntity } from './builder.entity';
import { DealEntity } from './deal.entity';

export enum CommissionStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  DISPUTED = 'disputed',
}

@Entity('commissions')
export class CommissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DealEntity, (deal) => deal.commissions)
  @JoinColumn({ name: 'deal_id' })
  deal: DealEntity;

  @Column()
  deal_id: string;

  @ManyToOne(() => BuilderEntity, (builder) => builder.commissions)
  @JoinColumn({ name: 'builder_id' })
  builder: BuilderEntity;

  @Column()
  builder_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  rate: number; // Commission rate percentage

  @Column({
    type: 'enum',
    enum: CommissionStatusEnum,
    default: CommissionStatusEnum.PENDING,
  })
  status: CommissionStatusEnum;

  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @Column({ type: 'date', nullable: true })
  paid_date: Date;

  @Column({ nullable: true })
  invoice_number: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AreaUnitEnum } from './project.enums';
import { PropertyExtraChargeEntity } from './property-extra-charge.entity';
import { PropertyEntity } from './property.entity';

export enum BrokerageTypeEnum {
  AMOUNT = 'amount',
  PERCENT = 'percent',
}

@Entity({ name: 'property_pricing' })
export class PropertyPricingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PropertyEntity, (property) => property.pricing, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column({ type: 'enum', enum: AreaUnitEnum, nullable: true })
  area_unit?: AreaUnitEnum;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  area: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  super_build_up_area?: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  carpet_area?: number;

  @Column({ type: 'numeric', precision: 18, scale: 2, default: 0 })
  ppu: number;

  @Column({ type: 'numeric', precision: 18, scale: 2, default: 0 })
  basic_amount: number;

  @Column({ type: 'enum', enum: BrokerageTypeEnum, nullable: true })
  brokerage_type?: BrokerageTypeEnum;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  brokerage_value: number;

  @Column({ type: 'numeric', precision: 18, scale: 2, default: 0 })
  total_amount: number;

  @Column({ default: 'INR' })
  currency: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => PropertyExtraChargeEntity, (charge) => charge.pricing)
  extra_charges: PropertyExtraChargeEntity[];
}

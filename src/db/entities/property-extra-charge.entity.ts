import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyPricingEntity } from './property-pricing.entity';

@Entity({ name: 'property_extra_charges' })
export class PropertyExtraChargeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PropertyPricingEntity, (pricing) => pricing.extra_charges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_pricing_id' })
  pricing: PropertyPricingEntity;

  @Column({ nullable: true })
  charge_type?: string;

  @Column({ type: 'numeric', precision: 6, scale: 3, default: 0 })
  percentage: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  per_unit: number;

  @Column({ type: 'numeric', precision: 18, scale: 2, default: 0 })
  amount: number;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ default: true })
  enabled: boolean;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyPricingEntity } from './property-pricing.entity';

export enum PropertyExtraChargeType {
  CGST = 'CGST',
  INTERIORS = 'INTERIORS',
  MAINTENANCE = 'MAINTENANCE',
  PARKING_SPACE = 'PARKING_SPACE',
  PRADHAN_MANTri_AWAS_YOJANA_BENEFITS = 'PRADHAN_MANTri_AWAS_YOJANA_BENEFITS',
  PREFRENTIAL_LOCALITY_CHARGE = 'PREFRENTIAL_LOCALITY_CHARGE',
  PROPERTY_TAX = 'PROPERTY_TAX',
  REGISTRATION_FEE = 'REGISTRATION_FEE',
  SGST = 'SGST',
  STAMP_DUTY = 'STAMP_DUTY',
  VALUE_ADDED_TAX = 'VALUE_ADDED_TAX',
  WATER_CHARGE = 'WATER_CHARGE',
  OTHER = 'OTHER',
}

@Entity({ name: 'property_extra_charges' })
export class PropertyExtraChargeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PropertyPricingEntity, (pricing) => pricing.extra_charges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_pricing_id' })
  pricing: PropertyPricingEntity;

  @Column({ type: 'enum', enum: PropertyExtraChargeType, nullable: true })
  charge_type?: PropertyExtraChargeType;

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

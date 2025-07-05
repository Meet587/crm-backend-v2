import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { LeadEntity } from './lead.entity';
import { DealEntity } from './deal.entity';

export enum PropertyTypeEnum {
  FLAT = 'flat',
  VILLA = 'villa',
  SHOP = 'shop',
  LAND = 'land',
  OFFICE = 'office',
}

export enum SizeUnitEnum {
  SQFT = 'sqft',
  SQM = 'sqm',
  ACRE = 'acre',
}

export enum PropertyStatusEnum {
  AVAILABLE = 'available',
  SOLD = 'sold',
  BLOCKED = 'blocked',
  HOLD = 'hold',
}

@Entity('properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  project_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  property_number: string;

  @Column({
    type: 'enum',
    enum: PropertyTypeEnum,
    default: PropertyTypeEnum.FLAT,
  })
  property_type: PropertyTypeEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  size: number;

  @Column({
    type: 'enum',
    enum: SizeUnitEnum,
    default: SizeUnitEnum.SQFT,
  })
  size_unit: SizeUnitEnum;

  @Column({ type: 'integer', nullable: true })
  bedrooms: number;

  @Column({ type: 'integer', nullable: true })
  bathrooms: number;

  @Column({ type: 'integer', nullable: true })
  floor_number: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number;

  @Column({
    type: 'enum',
    enum: PropertyStatusEnum,
    default: PropertyStatusEnum.AVAILABLE,
  })
  status: PropertyStatusEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => ProjectEntity, (project) => project.properties, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(() => LeadEntity, (lead) => lead.interested_property)
  leads: LeadEntity[];

  @OneToMany(() => DealEntity, (deal) => deal.property)
  deals: DealEntity[];
}
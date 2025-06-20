import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuilderEntity } from './builder.entity';
import { DealEntity } from './deal.entity';

export enum PropertyTypeEnum {
  APARTMENT = 'apartment',
  VILLA = 'villa',
  PLOT = 'plot',
  COMMERCIAL = 'commercial',
}

export enum PropertyStatusEnum {
  AVAILABLE = 'available',
  SOLD = 'sold',
  RESERVED = 'reserved',
  UNDER_CONSTRUCTION = 'under_construction',
}

@Entity('properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  pincode: string;

  @Column({
    type: 'enum',
    enum: PropertyTypeEnum,
  })
  type: PropertyTypeEnum;

  @Column({
    type: 'enum',
    enum: PropertyStatusEnum,
    default: PropertyStatusEnum.AVAILABLE,
  })
  status: PropertyStatusEnum;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'int', nullable: true })
  bedrooms: number;

  @Column({ type: 'int', nullable: true })
  bathrooms: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  area: number;

  @Column({ nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  amenities: string[];

  @ManyToOne(() => BuilderEntity, (builder) => builder.properties)
  @JoinColumn({ name: 'builder_id' })
  builder: BuilderEntity;

  @Column()
  builder_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => DealEntity, (deal) => deal.property)
  deals: DealEntity[];
}

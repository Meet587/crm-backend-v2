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
import { SiteVisitEntity } from './site-visit.entity';

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

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zip_code: string;

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

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  bedrooms: number;

  @Column({ nullable: true })
  bathrooms: number;

  @Column({ nullable: true })
  square_footage: number;

  @Column({ nullable: true })
  lot_size: number;

  @Column({ nullable: true })
  year_built: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => BuilderEntity, (builder) => builder.properties)
  @JoinColumn({ name: 'builder_id' })
  builder: BuilderEntity;

  @Column({ nullable: true })
  builder_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => DealEntity, (deal) => deal.property)
  deals: DealEntity[];

  @OneToMany(() => SiteVisitEntity, (siteVisit) => siteVisit.property)
  site_visits: SiteVisitEntity[];
}

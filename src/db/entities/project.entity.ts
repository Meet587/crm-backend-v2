import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AmenitiesEntity } from './amenities.entity';
import { BuilderEntity } from './builder.entity';
import { CityEntity } from './city.entity';
import { CommercialUnitEntity } from './commercial-unit.entity';
import { LandPlotEntity } from './land-plot.entity';
import { ConstructionType, PropertySubtypeEnum, PropertyTypeEnum } from './project.enums';
import { PropertyEntity } from './property.entity';
import { ResidentialUnitEntity } from './residential-unit.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  builder_id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ConstructionType,
    default: ConstructionType.NEW,
  })
  construction_type: ConstructionType;

  @Column({ type: 'simple-array', nullable: true })
  property_types: PropertyTypeEnum[];

  @Column({ type: 'simple-array', nullable: true })
  property_subtypes: PropertySubtypeEnum[];

  @Column({ type: 'varchar', length: 10, nullable: true })
  construction_year: string;

  @Column({ type: 'int', nullable: true })
  possession_month: number;

  @Column({ type: 'int', nullable: true })
  possession_year: number;

  @Column({ type: 'boolean', default: false })
  is_ready_possession: boolean;

  @Column({ type: 'simple-array', nullable: true })
  city_id: string[];

  @Column({ type: 'simple-array', nullable: true })
  amenities_ids: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  brochure_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  main_image_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address_line1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address_line2: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default:'123' })
  rera_number: string;

  @Column({ type: 'varchar', length: 50, nullable: false , default:'ac345'})
  gst_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => BuilderEntity, (builder) => builder.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'builder_id' })
  builder: BuilderEntity;

  @OneToMany(() => ResidentialUnitEntity, (unit) => unit.project)
  residential_units: ResidentialUnitEntity[];

  @OneToMany(() => CommercialUnitEntity, (unit) => unit.project)
  commercial_units: CommercialUnitEntity[];

  @OneToMany(() => LandPlotEntity, (plot) => plot.project)
  land_plots: LandPlotEntity[];

  @OneToMany(() => PropertyEntity, (property) => property.project)
  properties: PropertyEntity[];

  @ManyToMany(() => AmenitiesEntity, (amenity) => amenity.projects)
  @JoinTable({
    name: 'project_amenities',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'amenity_id', referencedColumnName: 'id' },
  })
  amenities: AmenitiesEntity[];

  @ManyToMany(() => CityEntity, (city) => city.projects)
  @JoinTable({
    name: 'project_cities',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'city_id', referencedColumnName: 'id' },
  })
  cities: CityEntity[];
}

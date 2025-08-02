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
import { BuilderEntity } from './builder.entity';
import { CityEntity } from './city.entity';
import { PropertyEntity } from './property.entity';
import { AmenitiesEntity } from './amenities.entity';

export enum ProjectTypeEnum {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  MIXED = 'mixed',
}

export enum ProjectStatusEnum {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  area: string;

  @Column({ type: 'uuid', nullable: true })
  city_id: string;

  @Column({ type: 'date', nullable: true })
  launch_date: Date;

  @Column({ type: 'date', nullable: true })
  possession_date: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  commission_rate: number;

  @Column({
    type: 'enum',
    enum: ProjectTypeEnum,
    default: ProjectTypeEnum.RESIDENTIAL,
  })
  project_type: ProjectTypeEnum;

  @Column({
    type: 'enum',
    enum: ProjectStatusEnum,
    default: ProjectStatusEnum.UPCOMING,
  })
  status: ProjectStatusEnum;

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

  @ManyToOne(() => CityEntity, (city) => city.projects, { nullable: true })
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;

  @OneToMany(() => PropertyEntity, (property) => property.project)
  properties: PropertyEntity[];

  @ManyToMany(() => AmenitiesEntity, (amenity) => amenity.projects)
  @JoinTable({
    name: 'project_amenities',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'amenity_id', referencedColumnName: 'id' },
  })
  amenities: AmenitiesEntity[];
}

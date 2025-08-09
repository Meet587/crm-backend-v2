import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { AreaUnitEnum, PropertySubtypeEnum } from './project.enums';
import { UnitFloorPlanEntity } from './unit-floor-plan.entity';

@Entity('land_plots')
export class LandPlotEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  project_id: string;

  @Column({
    type: 'enum',
    enum: PropertySubtypeEnum,
  })
  subtype: PropertySubtypeEnum;

  @Column({ type: 'varchar', length: 50, nullable: false })
  unit_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  super_build_up_area_sqFt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  carpet_area_sqFt: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  basic_cost: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  total_cost: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  floor_plan_url: string;

  @Column({
    type: 'enum',
    enum: AreaUnitEnum,
    default: AreaUnitEnum.SQFT,
  })
  inserted_area_unit: AreaUnitEnum;

  // Relationships
  @ManyToOne(() => ProjectEntity, (project) => project.land_plots, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @OneToMany(() => UnitFloorPlanEntity, (floorPlan) => floorPlan.land_plot)
  floor_plans: UnitFloorPlanEntity[];
}

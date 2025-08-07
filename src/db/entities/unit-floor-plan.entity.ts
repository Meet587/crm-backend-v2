import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResidentialUnitEntity } from './residential-unit.entity';
import { CommercialUnitEntity } from './commercial-unit.entity';
import { LandPlotEntity } from './land-plot.entity';

@Entity('unit_floor_plans')
export class UnitFloorPlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  residential_unit_id: string;

  @Column({ type: 'uuid', nullable: true })
  commercial_unit_id: string;

  @Column({ type: 'uuid', nullable: true })
  land_plot_id: string;

  // Relationships - Polymorphic relations
  @ManyToOne(() => ResidentialUnitEntity, (unit) => unit.floor_plans, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'residential_unit_id' })
  residential_unit: ResidentialUnitEntity;

  @ManyToOne(() => CommercialUnitEntity, (unit) => unit.floor_plans, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'commercial_unit_id' })
  commercial_unit: CommercialUnitEntity;

  @ManyToOne(() => LandPlotEntity, (plot) => plot.floor_plans, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'land_plot_id' })
  land_plot: LandPlotEntity;
}
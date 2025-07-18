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
import { BuilderContactEntity } from './builder-contact.entity';
import { CityEntity } from './city.entity';
import { CommissionEntity } from './commission.entity';
import { ProjectEntity } from './project.entity';

export enum BuilderStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('builders')
export class BuilderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'uuid', nullable: true })
  city_id: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  commission_rate: number;

  @Column({
    type: 'enum',
    enum: BuilderStatusEnum,
    default: BuilderStatusEnum.ACTIVE,
  })
  status: BuilderStatusEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => CityEntity, { nullable: true })
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;

  @ManyToMany(() => CityEntity, (city) => city.builders)
  @JoinTable({
    name: 'builder_operating_cities',
    joinColumn: { name: 'builder_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'city_id', referencedColumnName: 'id' },
  })
  operating_cities: CityEntity[];

  @OneToMany(() => BuilderContactEntity, (contact) => contact.builder)
  contact_persons: BuilderContactEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.builder)
  projects: ProjectEntity[];

  @OneToMany(() => CommissionEntity, (commission) => commission.builder)
  commissions: CommissionEntity[];
}

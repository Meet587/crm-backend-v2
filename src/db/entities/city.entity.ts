import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuilderEntity } from './builder.entity';
import { ProjectEntity } from './project.entity';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  pincode: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToMany(() => BuilderEntity, (builder) => builder.operating_cities)
  builders: BuilderEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.cities)
  projects: ProjectEntity[];
}

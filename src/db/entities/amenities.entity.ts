import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { PropertyEntity } from './property.entity';

@Entity('amenities')
export class AmenitiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToMany(() => ProjectEntity, (project) => project.amenities)
  projects: ProjectEntity[];

  @ManyToMany(() => PropertyEntity, (property) => property.amenities, {
    onDelete: 'CASCADE',
  })
  properties: PropertyEntity[];
}

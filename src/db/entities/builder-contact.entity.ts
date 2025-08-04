import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuilderEntity } from './builder.entity';

@Entity('builder_contacts')
export class BuilderContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'number', nullable: false })
  builder_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  designation: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => BuilderEntity, (builder) => builder.contact_persons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'builder_id' })
  builder: BuilderEntity;
}

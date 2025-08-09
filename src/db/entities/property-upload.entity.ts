import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'property_uploads' })
export class PropertyUploadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PropertyEntity, (property) => property.uploads, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column()
  file_path: string;

  @Column({ nullable: true })
  file_type?: string;

  @Column({ nullable: true })
  caption?: string;

  @Column({ default: 0 })
  sort_order: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'uploaded_by' })
  uploaded_by?: UserEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  uploaded_at: Date;
}

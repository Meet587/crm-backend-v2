import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';

@Entity({ name: 'property_furnitures_details' })
export class PropertyFurnitureDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PropertyEntity, (property) => property.furnitures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: PropertyEntity;

  @Column({ nullable: false })
  item_name: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}

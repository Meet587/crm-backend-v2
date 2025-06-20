import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';

export enum BuilderStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('builders')
export class BuilderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  website: string;

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

  @OneToMany(() => PropertyEntity, (property) => property.builder)
  properties: PropertyEntity[];
}

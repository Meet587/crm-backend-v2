import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealEntity } from './deal.entity';
import { LeadEntity } from './lead.entity';

export enum UserRoleEnum {
  ADMIN = 'admin',
  AGENT = 'agent',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.AGENT,
  })
  role: UserRoleEnum;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => LeadEntity, (lead) => lead.assigned_agent)
  assigned_leads: LeadEntity[];

  @OneToMany(() => DealEntity, (deal) => deal.agent)
  deals: DealEntity[];
}

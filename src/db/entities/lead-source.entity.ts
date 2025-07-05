import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { LeadEntity } from './lead.entity';
  
  export enum LeadSourceTypeEnum {
    WEBSITE = 'website',
    SOCIAL_MEDIA = 'social_media',
    REFERRAL = 'referral',
    WALK_IN = 'walk_in',
    ADVERTISEMENT = 'advertisement',
  }
  
  @Entity('lead_sources')
  export class LeadSourceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
  
    @Column({
      type: 'enum',
      enum: LeadSourceTypeEnum,
      default: LeadSourceTypeEnum.WEBSITE,
    })
    type: LeadSourceTypeEnum;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    // Relationships
    @OneToMany(() => LeadEntity, (lead) => lead.source_id)
    leads: LeadEntity[];
  }
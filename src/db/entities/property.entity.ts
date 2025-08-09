import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AmenitiesEntity } from './amenities.entity';
import { BuilderEntity } from './builder.entity';
import { CityEntity } from './city.entity';
import { DealEntity } from './deal.entity';
import { LeadEntity } from './lead.entity';
import { ProjectEntity } from './project.entity';
import { PropertySubtypeEnum, PropertyTypeEnum } from './project.enums';
import { PropertyFurnitureDetailsEntity } from './property-furniture.entity';
import { PropertyPricingEntity } from './property-pricing.entity';
import { PropertyUploadEntity } from './property-upload.entity';
import { UserEntity } from './user.entity';

export enum ListingForEnum {
  RENT = 'rent',
  SALE = 'sale',
  BOTH = 'both',
}

export enum ReadyStatusEnum {
  READY_TO_MOVE = 'ready_to_move',
  UNDER_CONSTRUCTION = 'under_construction',
  OTHER = 'other',
}

export enum FurnishingEnum {
  UNFURNISHED = 'unfurnished',
  SEMIFURNISHED = 'semifurnished',
  FURNISHED = 'furnished',
  PARTIALLY_FURNISHED = 'partially_furnished',
}

export enum PropertyOwnerShipEnum {
  FREEHOLD = 'freehold',
  LEASEHOLD = 'leasehold',
}

export enum PropertyFacingEnum {
  NORTH = 'north',
  SOUTH = 'south',
  EAST = 'east',
  WEST = 'west',
  NORTH_EAST = 'north_east',
  NORTH_WEST = 'north_west',
  SOUTH_EAST = 'south_east',
  SOUTH_WEST = 'south_west',
}

export enum OtherRoomsTypeEnum {
  POOJA_ROOM = 'pooja_room',
  STUDY = 'study',
  STORE = 'store',
  GUEST_ROOM = 'guest_room',
  SERVANT_ROOM = 'servant_room',
  OTHERS = 'others',
}

@Entity({ name: 'properties' })
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  code?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({
    type: 'enum',
    enum: ListingForEnum,
    default: ListingForEnum.SALE,
    nullable: true,
  })
  listing_for: ListingForEnum;

  @Column({ type: 'enum', enum: PropertyTypeEnum, nullable: true })
  property_type: PropertyTypeEnum;

  @Column({ type: 'enum', enum: PropertySubtypeEnum, nullable: true })
  property_sub_type: PropertySubtypeEnum;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'assign_to' })
  assign_to?: UserEntity;

  @Column({ type: 'uuid', nullable: true })
  source_id?: string;

  // @ManyToOne(() => UserEntity, { nullable: true })
  // @JoinColumn({ name: 'supplier_id' })
  // supplier?: UserEntity;

  @ManyToOne(() => ProjectEntity, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project?: ProjectEntity;

  @ManyToOne(() => BuilderEntity, { nullable: true })
  @JoinColumn({ name: 'builder_id' })
  builder?: BuilderEntity;

  @Column({ nullable: true })
  key_status?: string;

  @Column({ nullable: true })
  key_info?: string;

  @Column({
    type: 'enum',
    enum: ReadyStatusEnum,
    default: ReadyStatusEnum.OTHER,
  })
  ready_status: ReadyStatusEnum;

  @Column({ type: 'date', nullable: true })
  available_from?: Date;

  @Column({ nullable: true })
  address_line1?: string;

  @Column({ nullable: true })
  address_line2?: string;

  @Column({ nullable: true })
  landmark?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  zip_code?: string;

  @Column({ nullable: true })
  tower?: string;

  @Column({ nullable: true })
  unit_no?: string;

  @Column({ type: 'integer', default: 0 })
  floor_no: number;

  @Column({ type: 'integer', default: 0 })
  total_floors: number;

  @Column({ type: 'integer', default: 0 })
  bhk: number;

  @Column({ type: 'integer', default: 0 })
  bathrooms: number;

  @Column({ type: 'integer', default: 0 })
  balconies: number;

  @Column({
    type: 'enum',
    enum: OtherRoomsTypeEnum,
    array: true,
    nullable: true,
  })
  other_rooms?: OtherRoomsTypeEnum[];

  @Column({ type: 'enum', enum: FurnishingEnum, nullable: true })
  furnishing?: FurnishingEnum;

  @Column({ default: false })
  ready_to_build_furniture: boolean;

  @Column({ default: false })
  pet_allowed: boolean;

  @Column({ default: false })
  non_veg_allowed: boolean;

  @Column({ default: false })
  reserved_parkings: boolean;

  @Column({ type: 'integer', default: 0 })
  covered_parking_count: number;

  @Column({ type: 'integer', default: 0 })
  open_parking_count: number;

  @Column({ type: 'enum', enum: PropertyOwnerShipEnum, nullable: true })
  ownership?: PropertyOwnerShipEnum;

  @Column({ type: 'enum', enum: PropertyFacingEnum, nullable: true })
  facing?: PropertyFacingEnum;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by?: UserEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @OneToOne(() => PropertyPricingEntity, (pricing) => pricing.property)
  pricing?: PropertyPricingEntity;

  @OneToMany(
    () => PropertyFurnitureDetailsEntity,
    (furniture) => furniture.property,
  )
  furnitures: PropertyFurnitureDetailsEntity[];

  @OneToMany(() => PropertyUploadEntity, (upload) => upload.property)
  uploads: PropertyUploadEntity[];

  @ManyToMany(() => CityEntity, (location) => location.properties, {
    cascade: true,
  })
  @JoinTable({
    name: 'property_locations',
    joinColumn: { name: 'property_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'location_id', referencedColumnName: 'id' },
  })
  locations: CityEntity[];

  @ManyToMany(() => AmenitiesEntity, (amenity) => amenity.properties, {
    cascade: true,
  })
  @JoinTable({
    name: 'property_amenities',
    joinColumn: { name: 'property_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'amenity_id', referencedColumnName: 'id' },
  })
  amenities: AmenitiesEntity[];

  @OneToMany(() => LeadEntity, (lead) => lead.interested_property)
  leads: LeadEntity[];

  @OneToMany(() => DealEntity, (deal) => deal.property)
  deals: DealEntity[];
}

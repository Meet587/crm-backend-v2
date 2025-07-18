import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T[]>): Promise<T[]>;
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T[]>): T[];
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T | null>;
  findOneById(id: any): Promise<T | null>;
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  remove(data: T): Promise<T>;
}

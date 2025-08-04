import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BuilderContactEntity } from '../db/entities/builder-contact.entity';
import { BuilderEntity } from '../db/entities/builder.entity';
import { BuilderContactRepositoryInterface } from '../db/interfaces/builder-contact.interface';
import { BuilderRepositoryInterface } from '../db/interfaces/builder.interface';
import { CreateBuilderContactDto } from './dtos/create-builder-contact.dto';
import { CreateBuilderDto } from './dtos/create-builder.dto';

@Injectable()
export class BuilderService {
  constructor(
    @Inject('builderRepositoryInterface')
    private readonly builderRepository: BuilderRepositoryInterface,
    @Inject('builderContactRepositoryInterface')
    private readonly builderContactRepository: BuilderContactRepositoryInterface,
  ) {}

  async createBuilder(
    createBuilderDto: CreateBuilderDto,
  ): Promise<BuilderEntity> {
    try {
      return await this.builderRepository.save(createBuilderDto);
    } catch (error) {
      throw error;
    }
  }

  async getBuilderById(
    id: number,
    include_contact_persons: boolean = false,
  ): Promise<BuilderEntity> {
    try {
      const builder = await this.builderRepository.findByCondition({
        where: { id },
        relations: { contact_persons: include_contact_persons },
      });
      if (!builder) {
        throw new NotFoundException('Builder not found');
      }
      return builder;
    } catch (error) {
      throw error;
    }
  }

  async getAllBuilders(): Promise<BuilderEntity[]> {
    try {
      return await this.builderRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async addBuilderContactPerson(
    builder_id: number,
    createBuilderContactDto: CreateBuilderContactDto,
  ): Promise<BuilderContactEntity> {
    try {
      const builder = await this.getBuilderById(builder_id);

      return await this.builderContactRepository.save({
        ...createBuilderContactDto,
        builder: { id: builder.id },
      });
    } catch (error) {
      throw error;
    }
  }

  async getBuilderContactPerson(id: number): Promise<BuilderContactEntity> {
    try {
      const builderContact =
        await this.builderContactRepository.findByCondition({
          where: { builder_id: id },
          relations: { builder: true },
        });

      if (!builderContact) {
        throw new NotFoundException('Builder contact person not found');
      }

      return builderContact;
    } catch (error) {
      throw error;
    }
  }
}

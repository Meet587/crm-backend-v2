import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LeadEntity } from '../db/entities/lead.entity';
import { LeadSourceRepositoryInterface } from '../db/interfaces/lead-source.interface';
import { LeadRepositoryInterface } from '../db/interfaces/lead.interface';
import { UserService } from '../users/users.service';
import {
  CreateLeadDto,
  FindLeadsDto,
  PaginatedResponseDto,
  UpdateLeadDto,
} from './dto';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('leadRepositoryInterface')
    private readonly leadRepository: LeadRepositoryInterface,
    @Inject('leadSourceRepositoryInterface')
    private readonly leadSourceRepository: LeadSourceRepositoryInterface,
    private readonly usersService: UserService,
  ) {}

  async findAll(
    query: FindLeadsDto,
  ): Promise<PaginatedResponseDto<LeadEntity>> {
    try {
      const { search, status, assigned_agent_id, page = 1, limit = 10 } = query;
      // const queryBuilder = this.leadRepository.createQueryBuilder('lead');

      // if (search) {
      //   queryBuilder.andWhere(
      //     '(LOWER(lead.firstName) LIKE LOWER(:search) OR LOWER(lead.lastName) LIKE LOWER(:search) OR LOWER(lead.email) LIKE LOWER(:search) OR LOWER(lead.phone) LIKE LOWER(:search))',
      //     { search: `%${search}%` },
      //   );
      // }

      // if (source) {
      //   queryBuilder.andWhere('lead.source = :source', { source });
      // }

      // if (status) {
      //   queryBuilder.andWhere('lead.status = :status', { status });
      // }

      // if (assigned_agent_id) {
      //   queryBuilder.andWhere('lead.assigned_agent_id = :assigned_agent_id', {
      //     assigned_agent_id,
      //   });
      // }

      // queryBuilder.leftJoinAndSelect('lead.assigned_agent', 'assigned_agent');

      // const [result, total] = await queryBuilder
      //   .skip((page - 1) * limit)
      //   .take(limit)
      //   .getManyAndCount();

      const result = await this.leadRepository.findAll();
      const total = result.length;

      return {
        data: result,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<LeadEntity> {
    try {
      const lead = await this.leadRepository.findByCondition({
        where: { id },
        relations: { activities: true },
      });
      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found`);
      }
      return lead;
    } catch (error) {
      throw error;
    }
  }

  async create(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    try {
      if (createLeadDto.assigned_to) {
        const agent = await this.usersService.findById(
          createLeadDto.assigned_to,
        );

        if (!agent) {
          throw new BadRequestException(
            `Agent with ID ${createLeadDto.assigned_to} not found`,
          );
        }
      }
      const newLead = this.leadRepository.create(createLeadDto);
      return this.leadRepository.save(newLead);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<LeadEntity> {
    try {
      const lead = await this.findOne(id);

      if (updateLeadDto.assigned_agent_id) {
        const agent = await this.usersService.findById(
          updateLeadDto.assigned_agent_id,
        );

        if (!agent) {
          throw new BadRequestException(
            `Agent with ID ${updateLeadDto.assigned_agent_id} not found`,
          );
        }
      }

      Object.assign(lead, updateLeadDto);
      return this.leadRepository.save(lead);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const lead = await this.findOne(id);
      await this.leadRepository.remove(lead);
      return;
    } catch (error) {
      throw error;
    }
  }

  async assignToAgent(leadId: string, agentId: string): Promise<LeadEntity> {
    try {
      const lead = await this.findOne(leadId);

      const agent = await this.usersService.findById(agentId);

      lead.assigned_to_user = agent;
      return this.leadRepository.save(lead);
    } catch (error) {
      throw error;
    }
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { ClientEntity } from '../db/entities/client.entity';
import { LeadEntity, LeadStatusEnum } from '../db/entities/lead.entity';
import { LeadRepositoryInterface } from '../db/interfaces/lead.interface';
import { UsersService } from '../users/users.service';
import {
  ConvertLeadDto,
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
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
  ) {}

  async findAll(
    query: FindLeadsDto,
  ): Promise<PaginatedResponseDto<LeadEntity>> {
    const {
      search,
      source,
      status,
      assigned_agent_id,
      page = 1,
      limit = 10,
    } = query;
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
  }

  async findOne(id: string): Promise<LeadEntity> {
    const lead = await this.leadRepository.findByCondition({
      where: { id },
      relations: ['assigned_agent'],
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async create(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    if (createLeadDto.assigned_agent_id) {
      const agent = await this.usersService.findOne(
        createLeadDto.assigned_agent_id,
      );

      if (!agent) {
        throw new BadRequestException(
          `Agent with ID ${createLeadDto.assigned_agent_id} not found`,
        );
      }
    }
    const newLead = this.leadRepository.create(createLeadDto);
    return this.leadRepository.save(newLead);
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<LeadEntity> {
    const lead = await this.leadRepository.findByCondition({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    if (updateLeadDto.assigned_agent_id) {
      const agent = await this.usersService.findOne(
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
  }

  async remove(id: string): Promise<void> {
    const lead = await this.leadRepository.findByCondition({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    await this.leadRepository.remove(lead);
    return;
  }

  async convertToClient(
    id: string,
    convertLeadDto: ConvertLeadDto,
  ): Promise<ClientEntity> {
    const lead = await this.leadRepository.findByCondition({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    if (lead.status === LeadStatusEnum.CONVERTED) {
      throw new BadRequestException(
        `Lead with ID ${id} has already been converted to a client`,
      );
    }

    const client = await this.clientsService.create({
      ...convertLeadDto,
      first_name: convertLeadDto.first_name || lead.first_name,
      last_name: convertLeadDto.last_name || lead.last_name,
      email: convertLeadDto.email || lead.email,
      phone: convertLeadDto.phone || lead.phone,
      original_lead_id: lead.id,
    });

    lead.status = LeadStatusEnum.CONVERTED;
    lead.converted_client = client;
    await this.leadRepository.save(lead);

    return client;
  }

  async assignToAgent(leadId: string, agentId: string): Promise<LeadEntity> {
    const lead = await this.leadRepository.findByCondition({
      where: { id: leadId },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${leadId} not found`);
    }

    const agent = await this.usersService.findOne(agentId);
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found`);
    }

    lead.assigned_agent = agent;
    lead.assigned_agent_id = agent.id;
    return this.leadRepository.save(lead);
  }
}

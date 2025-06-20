import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../db/entities/client.entity';
import { LeadEntity, LeadStatusEnum } from '../db/entities/lead.entity';
import { UserEntity } from '../db/entities/user.entity';
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
    @InjectRepository(LeadEntity)
    private leadsRepository: Repository<LeadEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ClientEntity)
    private clientsRepository: Repository<ClientEntity>,
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
    const queryBuilder = this.leadsRepository.createQueryBuilder('lead');

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(lead.firstName) LIKE LOWER(:search) OR LOWER(lead.lastName) LIKE LOWER(:search) OR LOWER(lead.email) LIKE LOWER(:search) OR LOWER(lead.phone) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (source) {
      queryBuilder.andWhere('lead.source = :source', { source });
    }

    if (status) {
      queryBuilder.andWhere('lead.status = :status', { status });
    }

    if (assigned_agent_id) {
      queryBuilder.andWhere('lead.assigned_agent_id = :assigned_agent_id', {
        assigned_agent_id,
      });
    }

    queryBuilder.leftJoinAndSelect('lead.assigned_agent', 'assigned_agent');

    const [result, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: result,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<LeadEntity> {
    const lead = await this.leadsRepository.findOne({
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
      const agent = await this.usersRepository.findOne({
        where: { id: createLeadDto.assigned_agent_id },
      });
      if (!agent) {
        throw new BadRequestException(
          `Agent with ID ${createLeadDto.assigned_agent_id} not found`,
        );
      }
    }
    const newLead = this.leadsRepository.create(createLeadDto);
    return this.leadsRepository.save(newLead);
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<LeadEntity> {
    const lead = await this.leadsRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    if (updateLeadDto.assigned_agent_id) {
      const agent = await this.usersRepository.findOne({
        where: { id: updateLeadDto.assigned_agent_id },
      });
      if (!agent) {
        throw new BadRequestException(
          `Agent with ID ${updateLeadDto.assigned_agent_id} not found`,
        );
      }
    }

    Object.assign(lead, updateLeadDto);
    return this.leadsRepository.save(lead);
  }

  async remove(id: string): Promise<void> {
    const result = await this.leadsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
  }

  async convertToClient(
    id: string,
    convertLeadDto: ConvertLeadDto,
  ): Promise<ClientEntity> {
    const lead = await this.leadsRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    if (lead.status === LeadStatusEnum.CONVERTED) {
      throw new BadRequestException(
        `Lead with ID ${id} has already been converted to a client`,
      );
    }

    const newClient = this.clientsRepository.create({
      ...convertLeadDto,
      first_name: convertLeadDto.first_name || lead.first_name,
      last_name: convertLeadDto.last_name || lead.last_name,
      email: convertLeadDto.email || lead.email,
      phone: convertLeadDto.phone || lead.phone,
      original_lead: lead,
    });

    const client = await this.clientsRepository.save(newClient);

    lead.status = LeadStatusEnum.CONVERTED;
    lead.converted_client = client;
    await this.leadsRepository.save(lead);

    return client;
  }

  async assignToAgent(leadId: string, agentId: string): Promise<LeadEntity> {
    const lead = await this.leadsRepository.findOne({ where: { id: leadId } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${leadId} not found`);
    }

    const agent = await this.usersRepository.findOne({
      where: { id: agentId },
    });
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found`);
    }

    lead.assigned_agent = agent;
    lead.assigned_agent_id = agent.id;
    return this.leadsRepository.save(lead);
  }
}

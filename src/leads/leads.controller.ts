import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoleEnum } from '../db/entities/user.entity';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import {
  ClientResponseDto,
  ConvertLeadDto,
  CreateLeadDto,
  FindLeadsDto,
  LeadResponseDto,
  PaginatedResponseDto,
  UpdateLeadDto,
} from './dto';
import { LeadsService } from './leads.service';

@ApiTags('leads')
@Controller('leads')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all leads' })
  @ApiResponse({
    status: 200,
    description: 'List of leads retrieved successfully',
    type: PaginatedResponseDto,
  })
  async findAll(
    @Query() query: FindLeadsDto,
  ): Promise<PaginatedResponseDto<LeadResponseDto>> {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lead by ID' })
  @ApiResponse({
    status: 200,
    description: 'Lead retrieved successfully',
    type: LeadResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async findOne(@Param('id') id: string): Promise<LeadResponseDto> {
    return this.leadsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({
    status: 201,
    description: 'Lead created successfully',
    type: LeadResponseDto,
  })
  async create(@Body() createLeadDto: CreateLeadDto): Promise<LeadResponseDto> {
    return this.leadsService.create(createLeadDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a lead by ID' })
  @ApiResponse({
    status: 200,
    description: 'Lead updated successfully',
    type: LeadResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<LeadResponseDto> {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete a lead by ID' })
  @ApiResponse({ status: 204, description: 'Lead deleted successfully' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.leadsService.remove(id);
  }

  @Post(':id/convert')
  @ApiOperation({ summary: 'Convert a lead to a client' })
  @ApiResponse({
    status: 200,
    description: 'Lead converted to client successfully',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async convertToClient(
    @Param('id') id: string,
    @Body() convertLeadDto: ConvertLeadDto,
  ): Promise<ClientResponseDto> {
    return this.leadsService.convertToClient(id, convertLeadDto);
  }
}

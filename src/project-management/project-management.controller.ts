import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectManagementService } from './project-management.service';
import { SearchProjectQueryDto } from './dtos/search-query';

@Controller('project')
@ApiTags('Project Management')
export class ProjectManagementController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectManagementService.createProject(createProjectDto);
  }

  @Get(':id')
  async getProjectById(
    @Param('id') id: string,
    @Query('fetchUnits') fetchUnits: boolean,
  ) {
    return await this.projectManagementService.getProjectById(id, fetchUnits);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all projects with optional search and pagination',
    description:
      'Retrieve projects with optional filtering by name, property subtypes, and possession status. Supports pagination.',
  })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  async getAllProjects(@Query() searchQuery?: SearchProjectQueryDto) {
    return await this.projectManagementService.getAllProjects(searchQuery);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  async updateProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectManagementService.updateProject(
      id,
      updateProjectDto,
    );
  }

  @Get('amenities/list')
  async getAllAmenities() {
    return await this.projectManagementService.getAllAmenities();
  }
}

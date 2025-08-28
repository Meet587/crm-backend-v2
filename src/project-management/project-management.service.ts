import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BuilderService } from '../builder/builder.service';
import { ProjectEntity } from '../db/entities/project.entity';
import { ProjectRepositoryInterface } from '../db/interfaces/project.interface';
import { PaginatedResponseDto } from '../helpers/pagination.dto';
import { AmenitiesRepositoryInterface } from './../db/interfaces/amenities.interface';
import { CreateProjectDto } from './dtos/create-project.dto';
import { SearchProjectQueryDto } from './dtos/search-query';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectManagementService {
  constructor(
    @Inject('projectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('amenitiesRepositoryInterface')
    private readonly amenitiesRepository: AmenitiesRepositoryInterface,
    private readonly builderService: BuilderService,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      await this.builderService.getBuilderById(createProjectDto.builder_id);
      return await this.projectRepository.save(createProjectDto);
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(
    id: string,
    fetchUnits: boolean = false,
  ): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository.findByCondition({
        where: {
          id,
        },
        relations: {
          residential_units: fetchUnits,
          commercial_units: fetchUnits,
          land_plots: fetchUnits,
          builder: true,
        },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects(
    searchQuery?: SearchProjectQueryDto,
  ): Promise<PaginatedResponseDto<ProjectEntity> | ProjectEntity[]> {
    try {

      const { data, total } =
        await this.projectRepository.findWithSearchAndPagination(searchQuery);
      const { page = 1, limit = 10 } = searchQuery;

      const totalPages = Math.ceil(total / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return {
        data,
        total,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrev,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository.findOneById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      const updatedProject = {
        ...project,
        ...updateProjectDto,
        id: project.id,
      };
      return await this.projectRepository.save(updatedProject);
    } catch (error) {
      throw error;
    }
  }

  async getAllAmenities() {
    try {
      return await this.amenitiesRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}

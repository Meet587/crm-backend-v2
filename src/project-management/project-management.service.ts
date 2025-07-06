import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BuilderService } from '../builder/builder.service';
import { CityService } from '../city/city.service';
import { ProjectEntity } from '../db/entities/project.entity';
import { ProjectRepositoryInterface } from '../db/interfaces/project.interface';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectManagementService {
  constructor(
    @Inject('projectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface,
    private readonly builderService: BuilderService,
    private readonly cityService: CityService,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      const builder = await this.builderService.getBuilderById(
        createProjectDto.builder_id,
      );
      const city = await this.cityService.getCityById(createProjectDto.city_id);
      return await this.projectRepository.save(createProjectDto);
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(
    id: string,
    fetchProperties: boolean,
  ): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository.findByCondition({
        where: {
          id,
        },
        relations: {
          properties: fetchProperties,
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

  async getAllProjects(): Promise<ProjectEntity[]> {
    try {
      return await this.projectRepository.findAll();
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
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BuilderService } from './builder.service';
import { CreateBuilderContactDto } from './dtos/create-builder-contact.dto';
import { CreateBuilderDto } from './dtos/create-builder.sto';

@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new builder' })
  @ApiResponse({ status: 201, description: 'Builder created successfully' })
  async createBuilder(@Body() createBuilderDto: CreateBuilderDto) {
    return this.builderService.createBuilder(createBuilderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a builder by ID' })
  @ApiResponse({ status: 200, description: 'Builder retrieved successfully' })
  async getBuilderById(@Param('id') id: string) {
    return this.builderService.getBuilderById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all builders' })
  @ApiResponse({ status: 200, description: 'Builders retrieved successfully' })
  async getAllBuilders() {
    return this.builderService.getAllBuilders();
  }

  @Post(':id/contact')
  @ApiOperation({ summary: 'Add a new contact person to a builder' })
  @ApiResponse({
    status: 201,
    description: 'Contact person added successfully',
  })
  async addBuilderContactPerson(
    @Param('id') id: string,
    @Body() createBuilderContactDto: CreateBuilderContactDto,
  ) {
    return this.builderService.addBuilderContactPerson(
      id,
      createBuilderContactDto,
    );
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
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
  async getBuilderById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include_contact_persons') include_contact_persons: boolean = false,
  ) {
    return this.builderService.getBuilderById(id, include_contact_persons);
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createBuilderContactDto: CreateBuilderContactDto,
  ) {
    return this.builderService.addBuilderContactPerson(
      id,
      createBuilderContactDto,
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSiteVisitDto } from './dto/create-site-visit.dto';
import { UpdateSiteVisitDto } from './dto/update-site-visit.dto';
import { SiteVisitService } from './site-visit.service';

@ApiTags('site-visit')
@Controller('site-visit')
export class SiteVisitController {
  constructor(private readonly siteVisitService: SiteVisitService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new site visit record' })
  @ApiResponse({
    status: 201,
    description: 'The site visit record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createSiteVisitDto: CreateSiteVisitDto) {
    return this.siteVisitService.create(createSiteVisitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all site visit records' })
  @ApiResponse({ status: 200, description: 'Returns all site visit records.' })
  findAll() {
    return this.siteVisitService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single site visit record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the site visit record with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Site visit record not found.' })
  findOne(@Param('id') id: string) {
    return this.siteVisitService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing site visit record' })
  @ApiResponse({
    status: 200,
    description: 'The site visit record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Site visit record not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(
    @Param('id') id: string,
    @Body() updateSiteVisitDto: UpdateSiteVisitDto,
  ) {
    return this.siteVisitService.update(+id, updateSiteVisitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a site visit record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The site visit record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Site visit record not found.' })
  remove(@Param('id') id: string) {
    return this.siteVisitService.remove(+id);
  }
}

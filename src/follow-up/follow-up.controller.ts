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
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';
import { FollowUpService } from './follow-up.service';

@ApiTags('follow-up')
@Controller('follow-up')
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new follow-up record' })
  @ApiResponse({
    status: 201,
    description: 'The follow-up record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createFollowUpDto: CreateFollowUpDto) {
    return this.followUpService.create(createFollowUpDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all follow-up records' })
  @ApiResponse({ status: 200, description: 'Returns all follow-up records.' })
  findAll() {
    return this.followUpService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single follow-up record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the follow-up record with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Follow-up record not found.' })
  findOne(@Param('id') id: string) {
    return this.followUpService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing follow-up record' })
  @ApiResponse({
    status: 200,
    description: 'The follow-up record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Follow-up record not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(
    @Param('id') id: string,
    @Body() updateFollowUpDto: UpdateFollowUpDto,
  ) {
    return this.followUpService.update(+id, updateFollowUpDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a follow-up record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The follow-up record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Follow-up record not found.' })
  remove(@Param('id') id: string) {
    return this.followUpService.remove(+id);
  }
}

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
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@ApiTags('commission')
@Controller('commission')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new commission record' })
  @ApiResponse({
    status: 201,
    description: 'The commission record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCommissionDto: CreateCommissionDto) {
    return this.commissionService.create(createCommissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all commission records' })
  @ApiResponse({ status: 200, description: 'Returns all commission records.' })
  findAll() {
    return this.commissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single commission record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the commission record with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Commission record not found.' })
  findOne(@Param('id') id: string) {
    return this.commissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing commission record' })
  @ApiResponse({
    status: 200,
    description: 'The commission record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Commission record not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(
    @Param('id') id: string,
    @Body() updateCommissionDto: UpdateCommissionDto,
  ) {
    return this.commissionService.update(+id, updateCommissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a commission record by ID' })
  @ApiResponse({
    status: 200,
    description: 'The commission record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Commission record not found.' })
  remove(@Param('id') id: string) {
    return this.commissionService.remove(+id);
  }
}

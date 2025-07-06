import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../db/entities/project.entity';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    example: 'Project 1 description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The area of the project',
    example: '1000 sq.ft',
  })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiProperty({
    description: 'The city ID of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  city_id?: string;

  @ApiProperty({
    description: 'The builder ID of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  builder_id: string;

  @ApiProperty({
    description: 'The launch date of the project',
    example: '2021-01-01',
  })
  @IsDate()
  @IsOptional()
  launch_date?: Date;

  @ApiProperty({
    description: 'The possession date of the project',
    example: '2021-01-01',
  })
  @IsDate()
  @IsOptional()
  possession_date?: Date;

  @ApiProperty({
    description: 'The type of the project',
    example: 'residential',
  })
  @IsEnum(ProjectTypeEnum)
  @IsOptional()
  project_type?: ProjectTypeEnum;

  @ApiProperty({
    description: 'The status of the project',
    example: 'upcoming',
  })
  @IsEnum(ProjectStatusEnum)
  @IsOptional()
  status?: ProjectStatusEnum;
}

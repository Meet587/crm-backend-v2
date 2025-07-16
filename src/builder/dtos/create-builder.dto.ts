import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { BuilderStatusEnum } from '../../db/entities/builder.entity';

export class CreateBuilderDto {
  @ApiProperty({
    description: 'The name of the builder',
    example: 'Builder Inc',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The address of the builder',
    example: '123 Main St, Anytown, USA',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The city ID of the builder',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  city_id: string;

  @ApiProperty({
    description: 'The phone number of the builder',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phone: string;

  @ApiProperty({
    description: 'The email of the builder',
    example: 'builder@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The website of the builder',
    example: 'https://www.builder.com',
  })
  @IsString()
  @IsNotEmpty()
  website: string;

  @ApiProperty({
    description: 'The commission rate of the builder',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  commission_rate: number;

  @ApiProperty({
    description: 'The status of the builder',
    example: 'active',
    enum: BuilderStatusEnum,
  })
  @IsEnum(BuilderStatusEnum)
  @IsOptional()
  status?: BuilderStatusEnum;
}

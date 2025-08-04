import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BuilderStatusEnum } from '../../db/entities/builder.entity';
import { Type } from 'class-transformer';

export class CreateBuilderAddressDto {
  @ApiProperty({
    description: 'The address line 1 of the builder',
    example: '123 Main St',
  })
  @IsString()
  @IsNotEmpty()
  address_line_1: string;

  @ApiProperty({
    description: 'The address line 2 of the builder',
    example: 'Apt 123',
    required: false,
  })
  @IsString()
  @IsOptional()
  address_line_2?: string;

  @ApiProperty({
    description: 'The city ID of the builder',
    example: '123',
  })
  @IsNumber()
  @IsNotEmpty()
  city_id: number;
}

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
  @ValidateNested({ each: true })
  @Type((v) => CreateBuilderAddressDto)
  address: CreateBuilderAddressDto;

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

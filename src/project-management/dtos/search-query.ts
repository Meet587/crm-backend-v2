import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../helpers/pagination.dto';

export class SearchProjectQueryDto extends PaginationDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project 1',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  // @ApiProperty({
  //   description: 'The property subtypes of the project',
  //   enum: PropertySubtypeEnum,
  //   isArray: true,
  //   example: [PropertySubtypeEnum.APARTMENT_FLAT],
  //   required: false,
  // })
  // @Transform(({ value }) =>
  //   value && value !== ''
  //     ? Array.isArray(value)
  //       ? value
  //       : [value]
  //     : undefined,
  // )
  // @IsArray()
  // @IsEnum(PropertySubtypeEnum, { each: true })
  // @IsOptional()
  // property_subtypes?: PropertySubtypeEnum[];

  @ApiProperty({
    description: 'Whether the project is ready for possession',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  is_ready_possession?: boolean;
}

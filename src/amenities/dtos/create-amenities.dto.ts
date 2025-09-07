import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAmenitiesDto {
  @ApiProperty({
    description: 'amenity name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

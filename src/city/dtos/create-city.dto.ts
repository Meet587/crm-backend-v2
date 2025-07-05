import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    description: 'The name of the city',
    example: 'Visavadar',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The pincode of the city',
    example: '362130',
  })
  @IsString()
  @IsNotEmpty()
  pincode: string;

  @ApiProperty({
    description: 'The state of the city',
    example: 'Gujarat',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'The country of the city',
    example: 'India',
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}

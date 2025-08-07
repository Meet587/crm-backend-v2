import { PartialType } from '@nestjs/swagger';
import { CreateResidentialUnitDto } from './create-residential-unit.dto';

export class UpdateResidentialUnitDto extends PartialType(CreateResidentialUnitDto) {}
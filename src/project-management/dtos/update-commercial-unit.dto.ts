import { PartialType } from '@nestjs/swagger';
import { CreateCommercialUnitDto } from './create-commercial-unit.dto';

export class UpdateCommercialUnitDto extends PartialType(CreateCommercialUnitDto) {}
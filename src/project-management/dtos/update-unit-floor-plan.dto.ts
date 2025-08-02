import { PartialType } from '@nestjs/swagger';
import { CreateUnitFloorPlanDto } from './create-unit-floor-plan.dto';

export class UpdateUnitFloorPlanDto extends PartialType(CreateUnitFloorPlanDto) {}
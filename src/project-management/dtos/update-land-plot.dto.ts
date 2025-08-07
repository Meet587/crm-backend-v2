import { PartialType } from '@nestjs/swagger';
import { CreateLandPlotDto } from './create-land-plot.dto';

export class UpdateLandPlotDto extends PartialType(CreateLandPlotDto) {}
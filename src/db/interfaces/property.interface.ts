import { SearchPropertyQueryDto } from 'src/propert-management/dtos/search-property-query.dto';
import { PropertyEntity } from '../entities/property.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface PropertyRepositoryInterface
  extends BaseInterfaceRepository<PropertyEntity> {
  findWithSearchAndPagination(
    searchQuery: SearchPropertyQueryDto,
  ): Promise<{ data: PropertyEntity[]; total: number }>;
}

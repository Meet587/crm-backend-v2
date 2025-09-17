import { InjectRepository } from '@nestjs/typeorm';
import { SearchPropertyQueryDto } from 'src/propert-management/dtos/search-property-query.dto';
import { Repository } from 'typeorm';
import { PropertyEntity } from '../entities/property.entity';
import { PropertyRepositoryInterface } from '../interfaces/property.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class PropertyRepository
  extends BaseAbstractRepository<PropertyEntity>
  implements PropertyRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {
    super(propertyRepository);
  }
  async findWithSearchAndPagination(
    searchQuery: SearchPropertyQueryDto,
  ): Promise<{ data: PropertyEntity[]; total: number }> {
    const {
      propertyType,
      listingFor,
      city,
      bhk,
      minPrice,
      maxPrice,
      furnishing,
      propertySubType,
      title,
    } = searchQuery;
    const queryBuilder = this.propertyRepository.createQueryBuilder('property');
    queryBuilder.leftJoinAndSelect('property.pricing', 'pricing');
    queryBuilder.leftJoinAndSelect('property.locations', 'location');
    queryBuilder.leftJoinAndSelect('property.amenities', 'amenity');
    queryBuilder.leftJoinAndSelect('property.uploads', 'upload');
    queryBuilder.leftJoinAndSelect('property.furnitures', 'furniture');
    queryBuilder.leftJoinAndSelect('property.leads', 'lead');
    queryBuilder.leftJoinAndSelect('property.deals', 'deal');
    queryBuilder.select([
      'property.id',
      'property.title',
      'property.listing_for',
      'property.property_sub_type',
      'property.bhk',
      'property.furnishing',
      'property.available_from',
      'property.floor_no',
      'property.total_floors',
      'property.created_at',
      'pricing.id',
      'pricing.total_amount',
      'pricing.ppu',
      'location.id',
      'location.name',
    ]);
    queryBuilder.andWhere('property.deleted_at IS NULL');

    if (title) {
      queryBuilder.andWhere('property.title = :title', {
        title,
      });
    }
    if (propertyType) {
      queryBuilder.andWhere('property.property_type = :propertyType', {
        propertyType,
      });
    }
    if (propertySubType) {
      queryBuilder.andWhere('property.property_sub_type = :propertySubType', {
        propertySubType,
      });
    }
    if (listingFor) {
      queryBuilder.andWhere('property.listing_for = :listingFor', {
        listingFor,
      });
    }
    if (city) {
      queryBuilder.andWhere('location.name = :city', { city });
    }
    if (bhk) {
      queryBuilder.andWhere('property.bhk = :bhk', { bhk });
    }
    if (furnishing) {
      queryBuilder.andWhere('property.furnishing = :furnishing', {
        furnishing,
      });
    }
    if (minPrice) {
      queryBuilder.andWhere('pricing.total_amount >= :minPrice', { minPrice });
    }
    if (maxPrice) {
      queryBuilder.andWhere('pricing.total_amount <= :maxPrice', { maxPrice });
    }

    queryBuilder.orderBy('property.created_at', 'DESC');
    queryBuilder.skip((searchQuery.page - 1) * searchQuery.limit);
    queryBuilder.take(searchQuery.limit);
    return await queryBuilder
      .getManyAndCount()
      .then(([data, total]) => ({ data, total }));
  }
}

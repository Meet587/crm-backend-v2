import { faker } from '@faker-js/faker';
import {
  PropertySubtypeEnum,
  PropertyTypeEnum,
} from '../db/entities/project.enums';
import { DataSource } from 'typeorm';
import { AmenitiesEntity } from '../db/entities/amenities.entity';
import { BuilderEntity } from '../db/entities/builder.entity';
import { CityEntity } from '../db/entities/city.entity';
import { ProjectEntity } from '../db/entities/project.entity';
import {
  FurnishingEnum,
  ListingForEnum,
  OtherRoomsTypeEnum,
  PropertyEntity,
  PropertyFacingEnum,
  PropertyOwnerShipEnum,
  ReadyStatusEnum,
} from '../db/entities/property.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedProperties = async (dataSource: DataSource) => {
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const projectRepo = dataSource.getRepository(ProjectEntity);
  const builderRepo = dataSource.getRepository(BuilderEntity);
  const userRepo = dataSource.getRepository(UserEntity);
  const cityRepo = dataSource.getRepository(CityEntity);
  const amenitiesRepo = dataSource.getRepository(AmenitiesEntity);

  const projects = await projectRepo.find();
  const builders = await builderRepo.find();
  const users = await userRepo.find();
  const cities = await cityRepo.find();
  const amenities = await amenitiesRepo.find();

  const propertyTypes = Object.values(PropertyTypeEnum);
  const commercialSubtypes = [
    PropertySubtypeEnum.SHOP_SHOWROOM,
    PropertySubtypeEnum.OFFICE_SPACE,
    PropertySubtypeEnum.INDUSTRIAL_SHED,
    PropertySubtypeEnum.WAREHOUSE,
  ];
  const residentialSubtypes = [
    PropertySubtypeEnum.APARTMENT_FLAT,
    PropertySubtypeEnum.BUNGALOW_VILLA,
    PropertySubtypeEnum.ROW_HOUSE,
  ];
  const landSubtypes = [PropertySubtypeEnum.LAND_PLOT];
  const listingForValues = Object.values(ListingForEnum);
  const readyStatusValues = Object.values(ReadyStatusEnum);
  const furnishingValues = Object.values(FurnishingEnum);
  const ownershipValues = Object.values(PropertyOwnerShipEnum);
  const facingValues = Object.values(PropertyFacingEnum);
  const otherRoomsValues = Object.values(OtherRoomsTypeEnum);

  const properties = Array.from({ length: 35 }).map(() => {
    const property = new PropertyEntity();

    // Basic property information
    property.code = faker.string.alphanumeric(8).toUpperCase();
    property.title = faker.lorem.words(3);
    property.listing_for = faker.helpers.arrayElement(listingForValues);
    property.property_type = faker.helpers.arrayElement(propertyTypes);
    if (property.property_type === PropertyTypeEnum.RESIDENTIAL) {
      property.property_sub_type = faker.helpers.arrayElement(residentialSubtypes);
    } else if (property.property_type === PropertyTypeEnum.COMMERCIAL) {
      property.property_sub_type = faker.helpers.arrayElement(commercialSubtypes);
    } else if (property.property_type === PropertyTypeEnum.LAND) {
      property.property_sub_type = faker.helpers.arrayElement(landSubtypes);
    }

    // Relationships
    if (projects.length > 0) {
      property.project = faker.helpers.arrayElement(projects);
    }
    if (builders.length > 0) {
      property.builder = faker.helpers.arrayElement(builders);
    }
    if (users.length > 0) {
      property.assign_to = faker.helpers.arrayElement(users);
      property.created_by = faker.helpers.arrayElement(users);
    }

    // Property details
    property.ready_status = faker.helpers.arrayElement(readyStatusValues);
    property.available_from = faker.date.future();

    // Address information
    property.address_line1 = faker.location.streetAddress();
    property.address_line2 = faker.location.secondaryAddress();
    property.landmark = faker.location.nearbyGPSCoordinate()[0].toString();
    property.country = faker.location.country();
    property.state = faker.location.state();
    property.city = faker.location.city();
    property.zip_code = faker.location.zipCode();

    // Building details
    property.tower = faker.helpers.arrayElement(['A', 'B', 'C', 'D']);
    property.unit_no = faker.string.numeric(3);
    property.floor_no = faker.number.int({ min: 1, max: 20 });
    property.total_floors = faker.number.int({
      min: property.floor_no,
      max: 25,
    });

    // Room details
    property.bhk = faker.number.int({ min: 1, max: 4 });
    property.bathrooms = faker.number.int({ min: 1, max: property.bhk + 1 });
    property.balconies = faker.number.int({ min: 0, max: 3 });
    property.other_rooms = faker.helpers.arrayElements(otherRoomsValues, {
      min: 0,
      max: 3,
    });

    // Furnishing and amenities
    property.furnishing = faker.helpers.arrayElement(furnishingValues);
    property.ready_to_build_furniture = faker.datatype.boolean();
    property.pet_allowed = faker.datatype.boolean();
    property.non_veg_allowed = faker.datatype.boolean();
    property.reserved_parkings = faker.datatype.boolean();
    property.covered_parking_count = faker.number.int({ min: 0, max: 2 });
    property.open_parking_count = faker.number.int({ min: 0, max: 2 });

    // Property characteristics
    property.ownership = faker.helpers.arrayElement(ownershipValues);
    property.facing = faker.helpers.arrayElement(facingValues);
    property.description = faker.lorem.paragraph();

    return property;
  });

  const savedProperties = await propertyRepo.save(properties);

  // Add many-to-many relationships
  for (const property of savedProperties) {
    // Add random locations
    if (cities.length > 0) {
      const randomCities = faker.helpers.arrayElements(cities, {
        min: 1,
        max: 3,
      });
      property.locations = randomCities;
    }

    // Add random amenities
    if (amenities.length > 0) {
      const randomAmenities = faker.helpers.arrayElements(amenities, {
        min: 2,
        max: 8,
      });
      property.amenities = randomAmenities;
    }
  }

  await propertyRepo.save(savedProperties);
};

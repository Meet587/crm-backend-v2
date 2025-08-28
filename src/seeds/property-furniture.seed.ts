import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { PropertyFurnitureDetailsEntity } from '../db/entities/property-furniture.entity';
import { PropertyEntity } from '../db/entities/property.entity';

export const seedPropertyFurniture = async (dataSource: DataSource) => {
  const propertyFurnitureRepo = dataSource.getRepository(
    PropertyFurnitureDetailsEntity,
  );
  const propertyRepo = dataSource.getRepository(PropertyEntity);

  const properties = await propertyRepo.find();

  if (properties.length === 0) {
    console.log('No properties found. Skipping property furniture seeding.');
    return;
  }

  const furnitureItems = [
    'Sofa Set',
    'Dining Table',
    'Bed',
    'Wardrobe',
    'TV Unit',
    'Coffee Table',
    'Study Table',
    'Chair',
    'Bookshelf',
    'Side Table',
    'Dressing Table',
    'Shoe Rack',
    'Kitchen Cabinets',
    'Refrigerator',
    'Washing Machine',
    'Air Conditioner',
    'Microwave',
    'Water Heater',
    'Curtains',
    'Ceiling Fan',
  ];

  const propertyFurnitures = [];

  // Create furniture items for properties that are furnished or semi-furnished
  for (const property of properties) {
    if (
      property.furnishing === 'furnished' ||
      property.furnishing === 'semifurnished' ||
      property.ready_to_build_furniture
    ) {
      const numberOfItems = faker.number.int({ min: 3, max: 12 });

      for (let i = 0; i < numberOfItems; i++) {
        const furniture = new PropertyFurnitureDetailsEntity();

        furniture.property = property;
        furniture.item_name = faker.helpers.arrayElement(furnitureItems);
        furniture.quantity = faker.number.int({ min: 1, max: 4 });
        furniture.description = faker.lorem.sentence();

        propertyFurnitures.push(furniture);
      }
    }
  }

  if (propertyFurnitures.length > 0) {
    await propertyFurnitureRepo.save(propertyFurnitures);
  }
};

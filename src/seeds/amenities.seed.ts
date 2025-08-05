import { DataSource } from 'typeorm';
import { AmenitiesEntity } from '../db/entities/amenities.entity';

export const seedAmenities = async (dataSource: DataSource) => {
  const amenitiesRepo = dataSource.getRepository(AmenitiesEntity);
  
  // Common amenities for real estate projects
  const commonAmenities = [
    'Swimming Pool',
    'Gym', 'Clubhouse',
    'Children\'s Play Area',
    'Jogging Track',
    'Landscaped Gardens',
    'Power Backup',
    'Security',
    'Rain Water Harvesting',
    'Sewage Treatment Plant',
    'Car Parking',
    'Lift',
    'Park',
    'Indoor Games',
    'Shopping Center',
    'School',
    'Hospital',
    '24/7 Water Supply',
    'Vaastu Compliant',
    'Bank/ATM',
    'Cafeteria'
  ];

  const amenities = commonAmenities.map(name => {
    const amenity = new AmenitiesEntity();
    amenity.name = name;
    return amenity;
  });

  await amenitiesRepo.save(amenities);
  console.log(`Seeded ${amenities.length} amenities`);
};

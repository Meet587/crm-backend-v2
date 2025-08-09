import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { PropertyUploadEntity } from '../db/entities/property-upload.entity';
import { PropertyEntity } from '../db/entities/property.entity';
import { UserEntity } from '../db/entities/user.entity';

export const seedPropertyUploads = async (dataSource: DataSource) => {
  const propertyUploadRepo = dataSource.getRepository(PropertyUploadEntity);
  const propertyRepo = dataSource.getRepository(PropertyEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  const properties = await propertyRepo.find();
  const users = await userRepo.find();

  if (properties.length === 0) {
    console.log('No properties found. Skipping property uploads seeding.');
    return;
  }

  const fileTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'video/mp4',
  ];
  const imageCaptions = [
    'Living Room View',
    'Bedroom',
    'Kitchen',
    'Bathroom',
    'Balcony View',
    'Building Exterior',
    'Parking Area',
    'Common Area',
    'Floor Plan',
    'Property Document',
  ];

  const propertyUploads = [];

  // Create 3-8 uploads for each property
  for (const property of properties) {
    const numberOfUploads = faker.number.int({ min: 3, max: 8 });

    for (let i = 0; i < numberOfUploads; i++) {
      const upload = new PropertyUploadEntity();

      upload.property = property;
      upload.file_path = `/uploads/properties/${property.id}/${faker.string.uuid()}.${faker.helpers.arrayElement(['jpg', 'png', 'pdf', 'mp4'])}`;
      upload.file_type = faker.helpers.arrayElement(fileTypes);
      upload.caption = faker.helpers.arrayElement(imageCaptions);
      upload.sort_order = i;

      if (users.length > 0) {
        upload.uploaded_by = faker.helpers.arrayElement(users);
      }

      propertyUploads.push(upload);
    }
  }

  await propertyUploadRepo.save(propertyUploads);
};

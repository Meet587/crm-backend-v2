import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { PropertyExtraChargeEntity } from '../db/entities/property-extra-charge.entity';
import { PropertyPricingEntity } from '../db/entities/property-pricing.entity';

export const seedPropertyExtraCharges = async (dataSource: DataSource) => {
  const propertyExtraChargeRepo = dataSource.getRepository(
    PropertyExtraChargeEntity,
  );
  const propertyPricingRepo = dataSource.getRepository(PropertyPricingEntity);

  const propertyPricings = await propertyPricingRepo.find();

  if (propertyPricings.length === 0) {
    console.log(
      'No property pricings found. Skipping property extra charges seeding.',
    );
    return;
  }

  const chargeTypes = [
    'Maintenance Charges',
    'Parking Charges',
    'Club Membership',
    'Power Backup',
    'Legal Charges',
    'Registration Charges',
    'Stamp Duty',
    'GST',
    'Development Charges',
    'Utility Charges',
  ];

  const propertyExtraCharges = [];

  // Create 2-5 extra charges for each property pricing
  for (const pricing of propertyPricings) {
    const numberOfCharges = faker.number.int({ min: 2, max: 5 });

    for (let i = 0; i < numberOfCharges; i++) {
      const extraCharge = new PropertyExtraChargeEntity();

      extraCharge.pricing = pricing;
      extraCharge.charge_type = faker.helpers.arrayElement(chargeTypes);
      extraCharge.percentage = faker.number.float({
        min: 0,
        max: 10,
        fractionDigits: 3,
      });
      extraCharge.per_unit = faker.number.float({
        min: 0,
        max: 500,
        fractionDigits: 2,
      });
      extraCharge.amount = faker.number.int({ min: 5000, max: 200000 });
      extraCharge.description = faker.lorem.sentence();
      extraCharge.enabled = faker.datatype.boolean({ probability: 0.8 }); // 80% chance of being enabled

      propertyExtraCharges.push(extraCharge);
    }
  }

  await propertyExtraChargeRepo.save(propertyExtraCharges);
};

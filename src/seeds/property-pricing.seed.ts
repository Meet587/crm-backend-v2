import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { AreaUnitEnum } from '../db/entities/project.enums';
import {
  BrokerageTypeEnum,
  PropertyPricingEntity,
} from '../db/entities/property-pricing.entity';
import { PropertyEntity } from '../db/entities/property.entity';

export const seedPropertyPricing = async (dataSource: DataSource) => {
  const propertyPricingRepo = dataSource.getRepository(PropertyPricingEntity);
  const propertyRepo = dataSource.getRepository(PropertyEntity);

  const properties = await propertyRepo.find();

  if (properties.length === 0) {
    console.log('No properties found. Skipping property pricing seeding.');
    return;
  }

  const areaUnits = Object.values(AreaUnitEnum);
  const brokerageTypes = Object.values(BrokerageTypeEnum);

  const propertyPricings = properties.map((property) => {
    const pricing = new PropertyPricingEntity();

    pricing.property = property;
    pricing.area_unit = faker.helpers.arrayElement(areaUnits);
    pricing.area = faker.number.int({ min: 500, max: 3000 });
    pricing.super_build_up_area = faker.number
      .int({ min: 600, max: 3500 })
      .toString();
    pricing.carpet_area = faker.number.int({ min: 400, max: 2800 });
    pricing.ppu = faker.number.int({ min: 3000, max: 15000 }); // Price per unit
    pricing.basic_amount = pricing.area * pricing.ppu;
    pricing.brokerage_type = faker.helpers.arrayElement(brokerageTypes);

    if (pricing.brokerage_type === BrokerageTypeEnum.PERCENT) {
      pricing.brokerage_value = faker.number.float({
        min: 1,
        max: 5,
        fractionDigits: 2,
      });
      pricing.total_amount =
        pricing.basic_amount +
        (pricing.basic_amount * pricing.brokerage_value) / 100;
    } else {
      pricing.brokerage_value = faker.number.int({ min: 10000, max: 100000 });
      pricing.total_amount = pricing.basic_amount + pricing.brokerage_value;
    }

    pricing.currency = 'INR';

    return pricing;
  });

  await propertyPricingRepo.save(propertyPricings);
};

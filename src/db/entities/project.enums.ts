export enum PropertyUnitTypeEnum {
  RK1 = 'RK1', // 1RK
  RK2 = 'RK2', // 2RK
  BHK1 = 'BHK1', // 1BHK
  BHK1_5 = 'BHK1_5', // 1.5BHK
  BHK2 = 'BHK2', // 2BHK
  BHK3 = 'BHK3', // 3BHK
  BHK3_S = 'BHK3_S', // 3BHK+Servant
}

export enum PropertyTypeEnum {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  LAND = 'LAND',
}

export enum PropertySubtypeEnum {
  // Residential subtypes
  APARTMENT_FLAT = 'APARTMENT_FLAT',
  BUNGALOW_VILLA = 'BUNGALOW_VILLA',
  ROW_HOUSE = 'ROW_HOUSE',

  // Commercial subtypes
  SHOP_SHOWROOM = 'SHOP_SHOWROOM',
  OFFICE_SPACE = 'OFFICE_SPACE',
  INDUSTRIAL_SHED = 'INDUSTRIAL_SHED',
  WAREHOUSE = 'WAREHOUSE',

  // Land subtypes
  LAND_PLOT = 'LAND_PLOT',
}

export enum ConstructionType {
  OLD = 'OLD',
  NEW = 'NEW',
}

export enum AreaUnitEnum {
  SQFT = 'SQFT', // Square Feet
  SQYD = 'SQYD', // Square Yard
  SQMT = 'SQMT', // Square Meter
  ACRE = 'ACRE', // Acres
  BIGHA = 'BIGHA', // Bigha
  HECTARE = 'HECTARE',
}

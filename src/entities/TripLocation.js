const { EntitySchema } = require('typeorm');

const TripLocation = new EntitySchema({
  name: 'TripLocation',
  tableName: 'trip_locations',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: false,
    },
    location_name: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    location_picture: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    description: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    city_id: {
      type: 'int',
      nullable: true,
    },
    country_id: {
      type: 'int',
      nullable: true,
    },
    temperature: {
      type: 'float',
      nullable: true,
    },
    city_country: {
      type: 'varchar',
      length: 45,
      nullable: true,
    },
  },
});

module.exports = { TripLocation };
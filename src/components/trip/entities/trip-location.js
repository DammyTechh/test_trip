const { EntitySchema } = require('typeorm');

const TripLocation = new EntitySchema({
  name: 'TripLocation',
  tableName: 'trip_locations',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    location_name: { type: 'varchar', length: 100, nullable: false },
    location_picture: { type: 'varchar', length: 255, nullable: true },
    description: { type: 'varchar', length: 255, nullable: true },
    temperature: { type: 'float', nullable: true },
    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
  },
  relations: {
    city: {
      type: 'many-to-one',
      target: 'City',
      joinColumn: { name: 'city_id' },
      onDelete: 'SET NULL',
      inverseSide: 'tripLocations',
    },
    country: {
      type: 'many-to-one',
      target: 'Country',
      joinColumn: { name: 'country_id' },
      onDelete: 'SET NULL',
      inverseSide: 'tripLocations',
    },
    trips: {
      type: 'one-to-many',
      target: 'Trip',
      inverseSide: 'location',
    },
    activities: {
      type: 'one-to-many',
      target: 'TripActivity',
      inverseSide: 'location',
    },
  },
});

module.exports = { TripLocation };

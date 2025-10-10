const { EntitySchema } = require('typeorm');

const DerivedValuesByLocation = new EntitySchema({
  name: 'DerivedValuesByLocation',
  tableName: 'derived_values_by_location',
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: false,
    },
    location_id: {
      type: 'int',
      nullable: false,
    },
    avg_rating_of_a_location: {
      type: 'double',
      nullable: true,
    },
    total_interest_in_location: {
      type: 'int',
      nullable: true,
    },
    total_travellers_to_a_location: {
      type: 'int',
      nullable: true,
    },
    created_at: {
      type: 'datetime',
      nullable: true,
    },
    updated_at: {
      type: 'datetime',
      nullable: true,
    },
    updated_by: {
      type: 'bigint',
      nullable: true,
    },
  },
  relations: {
    tripLocation: {
      target: 'TripLocation',
      type: 'many-to-one',
      joinColumn: { name: 'location_id' },
      onDelete: 'CASCADE',
    },
  },
});

module.exports = { DerivedValuesByLocation };
const { EntitySchema } = require('typeorm');

const TripFrequency = new EntitySchema({
  name: 'TripFrequency',
  tableName: 'trip_frequency',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    frequency_name: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    description: {
      type: 'varchar',
      length: 255,
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
    update_by: {
      type: 'bigint',
      nullable: true,
    },
  },
});

module.exports = { TripFrequency };
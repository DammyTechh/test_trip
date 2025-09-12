const { EntitySchema } = require('typeorm');

const TripPurpose = new EntitySchema({
  name: 'TripPurpose',
  tableName: 'trip_purpose',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    purpose_name: {
      type: 'varchar',
      length: 100,
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
});

module.exports = { TripPurpose };
const { EntitySchema } = require('typeorm');

const TripStatus = new EntitySchema({
  name: 'TripStatus',
  tableName: 'trip_status',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    trip_status: {
      type: 'varchar',
      length: 50,
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
    created_by: {
      type: 'bigint',
      nullable: true,
    },
  },
});

module.exports = { TripStatus };
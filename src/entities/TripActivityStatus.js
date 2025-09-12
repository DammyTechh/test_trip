const { EntitySchema } = require('typeorm');

const TripActivityStatus = new EntitySchema({
  name: 'TripActivityStatus',
  tableName: 'trip_activity_status',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
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

module.exports = { TripActivityStatus };
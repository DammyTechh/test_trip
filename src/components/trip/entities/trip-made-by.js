const { EntitySchema } = require('typeorm');

const TripMadeBy = new EntitySchema({
  name: 'TripMadeBy',
  tableName: 'trp_made_by',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    trip_made_by_name: {
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

module.exports = { TripMadeBy };
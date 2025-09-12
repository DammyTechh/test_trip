const { EntitySchema } = require('typeorm');

const TripTransportationMode = new EntitySchema({
  name: 'TripTransportationMode',
  tableName: 'trip_transportation_mod',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    trip_transportation_modcol: {
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
    created_by: {
      type: 'bigint',
      nullable: true,
    },
  },
});

module.exports = { TripTransportationMode };
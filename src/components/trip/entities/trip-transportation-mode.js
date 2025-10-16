const { EntitySchema } = require('typeorm');

const TripTransportationMode = new EntitySchema({
  name: 'TripTransportationMode',
  tableName: 'trip_transportation_mode',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    name: { type: 'varchar', length: 100, nullable: false },
    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
    created_by: { type: 'uuid', nullable: true },
  },
  relations: {
    createdBy: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'created_by' },
      nullable: true,
    },
    trips: {
      type: 'one-to-many',
      target: 'Trip',
      inverseSide: 'transportationMode',
    },
  },
});

module.exports = { TripTransportationMode };

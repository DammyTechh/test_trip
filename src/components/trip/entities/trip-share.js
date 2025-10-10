const { EntitySchema } = require('typeorm');

const TripShare = new EntitySchema({
  name: 'TripShare',
  tableName: 'trip_share',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    trip_id: {
      type: 'bigint',
      nullable: false,
    },
    trip_user_id: {
      type: 'bigint',
      nullable: false,
    },
    shared_user_id: {
      type: 'bigint',
      nullable: false,
    },
    created_at: {
      type: 'datetime',
      nullable: true,
    },
    created_by: {
      type: 'bigint',
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
    trip: {
      target: 'Trip',
      type: 'many-to-one',
      joinColumn: { name: 'trip_id' },
    },
    tripCreator: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'trip_user_id' },
    },
    sharedUser: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'shared_user_id' },
    },
  },
});

module.exports = { TripShare };
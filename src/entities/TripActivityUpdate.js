const { EntitySchema } = require('typeorm');

const TripActivityUpdate = new EntitySchema({
  name: 'TripActivityUpdate',
  tableName: 'trip_activity_update',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: false,
    },
    trip_activity_id: {
      type: 'bigint',
      nullable: false,
    },
    user_id: {
      type: 'bigint',
      nullable: false,
    },
    trip_status_id: {
      type: 'int',
      nullable: false,
    },
    created_by: {
      type: 'bigint',
      nullable: true,
    },
    updated_by: {
      type: 'bigint',
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
  },
  relations: {
    tripActivity: {
      target: 'TripActivity',
      type: 'many-to-one',
      joinColumn: { name: 'trip_activity_id' },
    },
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'user_id' },
    },
    tripActivityStatus: {
      target: 'TripActivityStatus',
      type: 'many-to-one',
      joinColumn: { name: 'trip_status_id' },
      onDelete: 'CASCADE',
    },
  },
});

module.exports = { TripActivityUpdate };
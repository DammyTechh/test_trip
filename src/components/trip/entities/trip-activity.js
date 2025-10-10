const { EntitySchema } = require('typeorm');

const TripActivity = new EntitySchema({
  name: 'TripActivity',
  tableName: 'trip_activities',
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: false,
    },
    trip_id: {
      type: 'bigint',
      nullable: false,
    },
    activity_title: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    activity_location: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    all_day: {
      type: 'boolean',
      nullable: true,
    },
    start_datetime: {
      type: 'datetime',
      nullable: true,
    },
    end_datetime: {
      type: 'datetime',
      nullable: true,
    },
    notification_period: {
      type: 'int',
      nullable: true,
    },
    activity_note: {
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
    created_by: {
      type: 'bigint',
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
  },
});

module.exports = { TripActivity };
const { EntitySchema } = require('typeorm');

const Trip = new EntitySchema({
  name: 'Trip',
  tableName: 'trip',
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: false,
    },
    user_id: {
      type: 'bigint',
      nullable: false,
    },
    location_id: {
      type: 'int',
      nullable: true,
    },
    trip_frequency_id: {
      type: 'int',
      nullable: true,
    },
    trip_type_id: {
      type: 'int',
      nullable: true,
    },
    trip_made_by: {
      type: 'int',
      nullable: true,
    },
    trip_status: {
      type: 'int',
      nullable: true,
    },
    trip_interest: {
      type: 'bigint',
      nullable: true,
    },
    trip_transpotation_mode_id: {
      type: 'int',
      nullable: true,
    },
    trip_startdate: {
      type: 'date',
      nullable: true,
    },
    trip_enddate: {
      type: 'date',
      nullable: true,
    },
    trip_review_text: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    trip_review_star_number: {
      type: 'int',
      nullable: true,
    },
    trip_name: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    trip_destination: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    trip_amount: {
      type: 'double',
      nullable: true,
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'user_id' },
    },
    tripLocation: {
      target: 'TripLocation',
      type: 'many-to-one',
      joinColumn: { name: 'location_id' },
      onDelete: 'CASCADE',
    },
    tripFrequency: {
      target: 'TripFrequency',
      type: 'many-to-one',
      joinColumn: { name: 'trip_frequency_id' },
    },
    userType: {
      target: 'UserType',
      type: 'many-to-one',
      joinColumn: { name: 'trip_type_id' },
    },
    tripMadeBy: {
      target: 'TripMadeBy',
      type: 'many-to-one',
      joinColumn: { name: 'trip_made_by' },
    },
    tripStatusEntity: {
      target: 'TripStatus',
      type: 'many-to-one',
      joinColumn: { name: 'trip_status' },
    },
    userInterest: {
      target: 'UserInterest',
      type: 'many-to-one',
      joinColumn: { name: 'trip_interest' },
    },
    tripTransportationMode: {
      target: 'TripTransportationMode',
      type: 'many-to-one',
      joinColumn: { name: 'trip_transpotation_mode_id' },
    },
    tripActivities: {
      target: 'TripActivity',
      type: 'one-to-many',
      inverseSide: 'trip',
    },
    tripShares: {
      target: 'TripShare',
      type: 'one-to-many',
      inverseSide: 'trip',
    },
  },
});

module.exports = { Trip };
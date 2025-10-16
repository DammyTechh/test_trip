const { EntitySchema } = require('typeorm');

const TripActivity = new EntitySchema({
  name: 'TripActivity',
  tableName: 'trip_activities',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },

    // For day-based planning (e.g., Day 1, Day 2)
    day_number: { type: 'int', nullable: true },

    // For scheduled activities
    start_datetime: { type: 'datetime', nullable: true },
    end_datetime: { type: 'datetime', nullable: true },
    all_day: { type: 'boolean', nullable: true },

    activity_title: { type: 'varchar', length: 100, nullable: false },
    activity_note: { type: 'varchar', length: 255, nullable: true },

    // Optional notification period in minutes
    notification_period: { type: 'int', nullable: true },

    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
  },

  relations: {
    // The Trip this activity belongs to
    trip: {
      target: 'Trip',
      type: 'many-to-one',
      joinColumn: { name: 'trip_id' },
      onDelete: 'CASCADE',
    },

    category: {
    target: 'ActivityCategory',
    type: 'many-to-one',
    joinColumn: { name: 'category_id' },
    onDelete: 'SET NULL',
  },

    // Optional specific location for the activity
    location: {
      target: 'TripLocation',
      type: 'many-to-one',
      joinColumn: { name: 'location_id' },
      onDelete: 'SET NULL',
      inverseSide: 'activities',
    },

    // Connect with TripFrequency if you want to map it to recurring days or specific patterns
    tripFrequency: {
      target: 'TripFrequency',
      type: 'many-to-one',
      joinColumn: { name: 'trip_frequency_id' },
      nullable: true,
    },
  },
});

module.exports = { TripActivity };

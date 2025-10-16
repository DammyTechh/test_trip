const { EntitySchema } = require('typeorm');

const ActivityCategory = new EntitySchema({
  name: 'ActivityCategory',
  tableName: 'activity_categories',
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: false, // Name is required
    },
    created_at: {
      type: 'timestamp',
      createDate: true, // Automatically set on insert
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true, // Automatically updated
    },
  },
  relations: {
    activities: {
      target: 'TripActivity',
      type: 'one-to-many',
      inverseSide: 'category',
    },
  },
});

module.exports = { ActivityCategory };

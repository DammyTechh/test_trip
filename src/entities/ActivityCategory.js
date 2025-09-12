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

module.exports = { ActivityCategory };
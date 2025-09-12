const { EntitySchema } = require('typeorm');

const Interest = new EntitySchema({
  name: 'Interest',
  tableName: 'interest',
  columns: {
    interest_id: {
      type: 'bigint',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    description: {
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
    updated_by: {
      type: 'bigint',
      nullable: true,
    },
  },
});

module.exports = { Interest };
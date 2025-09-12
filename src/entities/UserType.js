const { EntitySchema } = require('typeorm');

const UserType = new EntitySchema({
  name: 'UserType',
  tableName: 'usertype',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: false,
    },
    name: {
      type: 'varchar',
      length: 45,
      nullable: true,
    },
    description: {
      type: 'varchar',
      length: 45,
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

module.exports = { UserType };
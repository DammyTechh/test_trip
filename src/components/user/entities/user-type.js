const { EntitySchema } = require('typeorm');

const UserType = new EntitySchema({
  name: 'UserType',
  tableName: 'user_types',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 50,
      unique: true,
      nullable: false,
    },
    description: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    userRoles: {
      type: 'one-to-many',
      target: 'UserRole',
      inverseSide: 'userType',
    },
  },
});

module.exports = { UserType };

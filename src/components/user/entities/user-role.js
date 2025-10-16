const { EntitySchema } = require('typeorm');

const UserRole = new EntitySchema({
  name: 'UserRole',
  tableName: 'user_roles',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    created_at: { type: 'timestamp', createDate: true },
    updated_at: { type: 'timestamp', updateDate: true },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      onDelete: 'CASCADE',
      nullable: false,
    },
    user_type: {
      type: 'many-to-one',
      target: 'UserType',
      joinColumn: { name: 'user_type_id' },
      onDelete: 'CASCADE',
      nullable: false,
    },
  },
});

module.exports = { UserRole };

const { EntitySchema } = require('typeorm');

const UserInterest = new EntitySchema({
  name: 'UserInterest',
  tableName: 'user_interest',
  columns: {
    user_interest_id: {
      type: 'bigint',
      primary: true,
      generated: true,
    },
    user_id: {
      type: 'bigint',
      nullable: false,
    },
    interest_id: {
      type: 'bigint',
      nullable: false,
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
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'user_id' },
      onDelete: 'CASCADE',
    },
    interest: {
      target: 'Interest',
      type: 'many-to-one',
      joinColumn: { name: 'interest_id' },
      onDelete: 'CASCADE',
    },
  },
});

module.exports = { UserInterest };
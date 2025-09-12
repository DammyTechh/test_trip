const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
  name: 'User',
  tableName: 'user',
  columns: {
    user_id: {
      type: 'bigint',
      primary: true,
      generated: true,
    },
    first_name: {
      type: 'varchar',
      length: 45,
      nullable: false,
    },
    last_name: {
      type: 'varchar',
      length: 45,
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 255,
      nullable: false,
      unique: true,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    phone_number: {
      type: 'varchar',
      length: 20,
      nullable: true,
    },
    usertype_id: {
      type: 'int',
      nullable: true,
    },
    is_verified: {
      type: 'boolean',
      default: false,
    },
    verification_token: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    is_onboarded: {
      type: 'boolean',
      default: false,
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
    userType: {
      target: 'UserType',
      type: 'many-to-one',
      joinColumn: { name: 'usertype_id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    userInterests: {
      target: 'UserInterest',
      type: 'one-to-many',
      inverseSide: 'user',
    },
    trips: {
      target: 'Trip',
      type: 'one-to-many',
      inverseSide: 'user',
    },
  },
});

module.exports = { User };
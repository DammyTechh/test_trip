const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    user_id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    first_name: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
    last_name: {
      type: "varchar",
      length: 45,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 255,
      nullable: false,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    phone_number: {
      type: "varchar",
      length: 20,
      nullable: true,
    },
    usertype_id: {
      type: "int",
      nullable: true,
    },
    is_verified: {
      type: "boolean",
      default: false,
    },
    password_reset_code: {
      type: "text",
      nullable: true,
    },
    password_reset_code_expires_at: {
      type: "datetime",
      nullable: true,
    },
    email_verification_code: {
      type: "text",
      nullable: true,
    },
    email_verification_expires_at: {
      type: "datetime",
      nullable: true,
    },
    is_onboarded: {
      type: "boolean",
      default: false,
    },
    travel_frequency: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    budget_range: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    trip_purpose: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    destination_specialties: {
      type: "text",
      nullable: true,
    },
    planning_experience_years: {
      type: "int",
      nullable: true,
    },
    planning_rate: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },
    social_provider: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    social_id: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
    updated_by: {
      type: "bigint",
      nullable: true,
    },
  },
  relations: {
    userType: {
      target: "UserType",
      type: "many-to-one",
      joinColumn: { name: "usertype_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    userInterests: {
      target: "UserInterest",
      type: "one-to-many",
      inverseSide: "user",
    },
    trips: {
      target: "Trip",
      type: "one-to-many",
      inverseSide: "user",
    },
  },
});

module.exports = { User };

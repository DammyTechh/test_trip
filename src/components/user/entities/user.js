const { EntitySchema } = require("typeorm");
const { OnboardingSteps } = require("../../../utils/onboarding-steps");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    user_id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    first_name: {
      type: "varchar",
      nullable: true,
    },
    last_name: {
      type: "varchar",
      nullable: true,
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
    // Step-based onboarding
    onboarding_step: {
      type: "int",
      default: OnboardingSteps.EMAIL_SUBMITTED, // 0 = email submitted, 1 = profile, 2 = interests, 3 = preferences, etc.
    },
    is_onboarded: {
      type: "boolean",
      default: false, // set to true when onboarding_step reaches final step
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
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    userRoles: {
      type: "one-to-many",
      target: "UserRole",
      inverseSide: "user",
      cascade: true,
    },
    userInterests: {
      target: "UserInterest",
      type: "one-to-many",
      inverseSide: "user",
    },
    userDestinationSpecialties: {
      type: "one-to-many",
      target: "UserDestinationSpecialties",
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

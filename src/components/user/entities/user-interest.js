const { EntitySchema } = require("typeorm");

const UserInterest = new EntitySchema({
  name: "UserInterest",
  tableName: "user_interests",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
      inverseSide: "interests",
    },
    interest: {
      type: "many-to-one",
      target: "Interest",
      joinColumn: { name: "interest_id" },
      onDelete: "CASCADE",
      inverseSide: "userInterests",
    },
  },
});

module.exports = { UserInterest };

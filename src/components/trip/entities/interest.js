const { EntitySchema } = require("typeorm");

const Interest = new EntitySchema({
  name: "Interest",
  tableName: "interests",
  columns: {
    id: {
      type: "uuid",
      primary: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    description: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
   relations: {
    userInterests: {
      type: "one-to-many",
      target: "UserInterest",
      inverseSide: "interest",
    },
    tripInterests: {
      type: "one-to-many",
      target: "TripInterest",
      inverseSide: "interest",
    },
  },
});

module.exports = { Interest };

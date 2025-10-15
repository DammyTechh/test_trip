const { EntitySchema } = require("typeorm");

const TripInterest = new EntitySchema({
  name: "TripInterest",
  tableName: "trip_interests",
  columns: {
    id: {
      type: "uuid",
      primary: true,
    },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
 relations: {
    trip: {
      type: "many-to-one",
      target: "Trip",
      joinColumn: { name: "trip_id" },
      onDelete: "CASCADE",
      inverseSide: "interests",
    },
    interest: {
      type: "many-to-one",
      target: "Interest",
      joinColumn: { name: "interest_id" },
      onDelete: "CASCADE",
      inverseSide: "tripInterests",
    },
  },
});

module.exports = { TripInterest };

const { EntitySchema } = require("typeorm");

const TripTravellerType = new EntitySchema({
  name: "TripTravellerType",
  tableName: "trip_traveller_types",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    name: {
      type: "varchar",
      length: 100,
      nullable: false, // e.g., "Solo", "Couple", "Family", "Group"
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
    trips: {
      target: "Trip",
      type: "one-to-many",
      inverseSide: "travellerType",
    },
  },
});

module.exports = { TripTravellerType };

const { EntitySchema } = require("typeorm");

const TripFrequency = new EntitySchema({
  name: "TripFrequency",
  tableName: "trip_frequency",
  columns: {
    id: { type: "int", primary: true, generated: true },
    frequency_name: { type: "varchar", length: 100, nullable: false }, // "Daily", "Weekly", "Custom Day Mapping"
    description: { type: "varchar", length: 255, nullable: true },
    total_days: { type: "int", nullable: true, comment: "Number of days this frequency spans" },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
  relations: {
    trips: {
      type: "one-to-many",
      target: "Trip",
      inverseSide: "tripFrequency",
    },
  },
});

module.exports = { TripFrequency };

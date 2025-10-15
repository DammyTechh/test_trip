const { EntitySchema } = require("typeorm");

const TripItinerary = new EntitySchema({
  name: "TripItinerary",
  tableName: "trip_itineraries",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    day_number: { type: "int", nullable: false, comment: "Day number within the trip" },
    title: { type: "varchar", length: 150, nullable: true, comment: "Optional name/theme for the day" },
    notes: { type: "text", nullable: true, comment: "General notes for this day's plan" },
    date: { type: "date", nullable: true, comment: "Specific date for this itinerary day (if scheduled)" },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
  relations: {
    trip: {
      target: "Trip",
      type: "many-to-one",
      joinColumn: { name: "trip_id" },
      onDelete: "CASCADE",
    },
    activities: {
      target: "TripActivity",
      type: "one-to-many",
      inverseSide: "itinerary",
      cascade: true,
    },
  },
});

module.exports = { TripItinerary };

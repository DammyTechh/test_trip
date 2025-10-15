const { EntitySchema } = require("typeorm");

const Trip = new EntitySchema({
  name: "Trip",
  tableName: "trip",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    trip_name: { type: "varchar", length: 100, nullable: true },
    trip_destination: { type: "varchar", length: 100, nullable: true },
    trip_start_date: { type: "date", nullable: true },
    trip_end_date: { type: "date", nullable: true },
    trip_review_text: { type: "varchar", length: 255, nullable: true },
    trip_review_star_number: { type: "int", nullable: true },
    trip_amount: { type: "double", nullable: true },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },

  relations: {
    // User who created the trip
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },

    travelStyle: {
      target: "TravelStyle",
      type: "many-to-one",
      joinColumn: { name: "travel_style_id" },
      onDelete: "SET NULL",
    },

    planned_by_role: {
      target: "UserRole",
      type: "many-to-one",
      joinColumn: { name: "planned_by_role_id" },
      nullable: true,
    },

    location: {
      target: "TripLocation",
      type: "many-to-one",
      joinColumn: { name: "location_id" },
      onDelete: "SET NULL",
      inverseSide: "trips",
    },

    
    
    

    tripFrequency: {
      target: "TripFrequency",
      type: "many-to-one",
      joinColumn: { name: "trip_frequency_id" },
      nullable: true, // optional if not all trips follow a frequency pattern

    },

    travellerType: {
      target: "TripTravellerType",
      type: "many-to-one",
      joinColumn: { name: "traveller_type_id" },
      nullable: false,
    },

    tripStatus: {
      target: "TripStatus",
      type: "many-to-one",
      joinColumn: { name: "trip_status_id" },
    },

    transportationMode: {
      target: "TripTransportationMode",
      type: "many-to-one",
      joinColumn: { name: "trip_transportation_mode_id" },
    },

    interests: {
      target: "TripInterest",
      type: "many-to-many",
      joinTable: { name: "trip_interest" },
      inverseSide: "trips",
    },

    // ✅NEW: Trip Itineraries (one trip can have many itinerary days)
    itineraries: {
      target: "TripItinerary",
      type: "one-to-many",
      inverseSide: "trip",
      cascade: true,
    },

    activities: {
      target: "TripActivity",
      type: "one-to-many",
      inverseSide: "trip",
    },

    shares: {
      target: "TripShare",
      type: "one-to-many",
      inverseSide: "trip",
    },
  },
});

module.exports = { Trip };

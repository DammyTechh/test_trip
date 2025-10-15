const { EntitySchema } = require("typeorm");

const TripShare = new EntitySchema({
  name: "TripShare",
  tableName: "trip_share",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    trip_id: { type: "uuid", nullable: false },
    shared_user_id: { type: "uuid", nullable: false },
    status: {
      type: "varchar",
      length: 50,
      nullable: false,
      default: "pending",
    },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
  relations: {
    trip: {
      target: "Trip",
      type: "many-to-one",
      joinColumn: { name: "trip_id" },
      onDelete: "CASCADE", // If the trip is deleted, remove shares
    },
    sharedUser: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "shared_user_id" },
      onDelete: "CASCADE", // If the user is deleted, remove shares
    },
  },
});

module.exports = { TripShare };

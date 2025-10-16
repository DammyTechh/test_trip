const { EntitySchema } = require("typeorm");

const City = new EntitySchema({
  name: "City",
  tableName: "city",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    name: { type: "varchar", length: 100, nullable: false },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
  relations: {
    country: {
      type: "many-to-one",
      target: "Country",
      joinColumn: { name: "country_id" },
      onDelete: "SET NULL",
      inverseSide: "cities",
    },
    tripLocations: {
      type: "one-to-many",
      target: "TripLocation",
      inverseSide: "city",
    },
  },
});

module.exports = { City };

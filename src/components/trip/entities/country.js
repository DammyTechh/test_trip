const { EntitySchema } = require("typeorm");

const Country = new EntitySchema({
  name: "Country",
  tableName: "country",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    name: { type: "varchar", length: 100, nullable: false },
    code: { type: "varchar", length: 10, nullable: true }, // ISO code optional
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
  relations: {
    cities: {
      type: "one-to-many",
      target: "City",
      inverseSide: "country",
    },
    tripLocations: {
      type: "one-to-many",
      target: "TripLocation",
      inverseSide: "country",
    },
  },
});

module.exports = { Country };

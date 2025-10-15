const { EntitySchema } = require("typeorm");

const TravelStyle = new EntitySchema({
  name: "TravelStyle",
  tableName: "travel_styles",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    name: { type: "varchar", length: 100, nullable: false }, // e.g. "Budget-Friendly"
    description: { type: "varchar", length: 255, nullable: true },
    created_at: { type: "timestamp", createDate: true },
    updated_at: { type: "timestamp", updateDate: true },
  },
});

module.exports = { TravelStyle };

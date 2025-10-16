const { EntitySchema} = require("typeorm");

const UserDestinationSpecialties = new EntitySchema({
  name: "UserDestinationSpecialties",
  tableName: "user_destination_specialties",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
    },
  },
});
module.exports = { UserDestinationSpecialties };

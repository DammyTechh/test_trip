const { EntitySchema } = require("typeorm");

const TripStatus = new EntitySchema({
  name: "TripStatus",
  tableName: "trip_status",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },

    //  Planned → initial status after trip creation.

    // Scheduled → after itineraries are confirmed and participants added.

    // Ongoing → automatically set when the current date is within trip_start_date and trip_end_date.

    // Completed → set after trip_end_date passes.

    // Cancelled and Postponed → manual updates by the trip creator or admin.

    // Archived → optional for storing old trips separately.

    trip_status: {
      type: "varchar",
      length: 50,
      nullable: false, // Planned, Scheduled, Ongoing, Completed,
    },
    description: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
    updated_by: {
      type: "bigint",
      nullable: true,
    },
  },
});

module.exports = { TripStatus };

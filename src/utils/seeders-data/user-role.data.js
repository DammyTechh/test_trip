const { v4 } = require("uuid");

const userRoles = [
  {
    id: v4(),
    name: "traveler",
    description: "User looking to plan and book trips.",
  },
  {
    id: v4(),
   name: "planner",
    description: "User who helps travelers plan trips.",
  },
  {
    id: v4(),
    name: "both",
    description: "User who can act as both traveler and planner.",
  },
];

module.exports = {
  userRoles,
};

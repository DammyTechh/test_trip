const { seedEntity } = require("../utils/seed-utils");
const { Interest } = require("../components/trip/entities/interest");
const { UserType } = require("../components/user/entities/user-type");
const { interests } = require("../utils/seeders-data/seed.data");
const { userRoles } = require("../utils/seeders-data/user-role.data");
const seedDefaultData = async () => {
  try {
    await seedEntity(Interest, interests, "name");
    await seedEntity(UserType, userRoles, "name");
    console.log("✅ Default data seeded successfully");
  } catch (error) {
    console.error("Error seeding default data:", error);
  }
};

module.exports = { seedDefaultData };

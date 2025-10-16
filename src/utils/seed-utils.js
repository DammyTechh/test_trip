const { AppDataSource } = require("../config/database");

/**
 * Generic seeder for any entity.
 * @param {Entity} entity - TypeORM Entity (e.g., UserType)
 * @param {Array<Object>} seedData - Array of objects to seed
 * @param {String} uniqueKey - Unique field to check for existing records (e.g., 'name')
 */
const seedEntity = async (entity, seedData, uniqueKey) => {
  const repository = AppDataSource.getRepository(entity);

  for (const item of seedData) {
    const existing = await repository.findOne({
      where: { [uniqueKey]: item[uniqueKey] },
    });

    if (!existing) {
      await repository.save({
        ...item,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  }
};

module.exports = { seedEntity };

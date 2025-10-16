const { AppDataSource } = require("../../../config/database");
const { UserRole } = require("../entities/user-role");

class UserRoleRepository {
  _repository = AppDataSource.getRepository(UserRole);

  async save(userId, userTypeId) {
    const saved = await this._repository.save({
      user: { user_id: userId },
      user_type: { id: userTypeId },
    });
    return await this._repository.findOne({
      where: { id: saved.id },
      relations: ["user", "user_type"],
    });
  }
  async findByUserId(userId, userTypeId) {
    const response = await this._repository.findOne({
      where: {
        user: { user_id: userId },
        user_type: { id: userTypeId },
      },
      relations: ["user", "user_type"], // optional if you want to load relations
    });
    return response;
  }

  async updateById(id, payload) {
    // Step 1: Update
    const role = await this._repository.findOneBy({ id });
    if (!role) return null;

    Object.assign(role, payload);
    await this._repository.save(role);

    const updated = await this._repository.findOne({
      where: { id },
      relations: ["user", "user_type"],
      select: {
        id: true,
        // user: { user_id: true, email: true },
        user_type: { id: true, name: true, description: true },
      },
    });

    return updated;
  }
}

module.exports = new UserRoleRepository();

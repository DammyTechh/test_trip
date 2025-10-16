const { AppDataSource } = require("../../../config/database");
const { User } = require("../entities/user");

class UserRepository {
  _repository = AppDataSource.getRepository(User);

  async create(payload) {
    const user = this._repository.create(payload);
    const saved = await this._repository.save(user);

    const response = await this._repository.findOne({
      where: { user_id: saved.user_id },
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    return response;
  }

  async findByEmail(email) {
    const response = await this._repository.findOne({
      where: { email },
    });
    return response;
  }

  async findByResetCode(password_reset_code) {
    const response = await this._repository.findOneBy({
      password_reset_code,
    });
    return response;
  }
  async findById(user_id) {
    const response = await this._repository.findOne({
      where: { user_id },
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        password: true,
        onboarding_step: true
      },
      relations: ["user_roles", "user_roles.user_type", "user_interests", 'trips', "user_destination_specialties"],
    });
    return response;
  }

  async updateById(user_id, payload) {
    const user = await this._repository.findOneBy({
      user_id,
    });
    if (!user) return null;
    Object.assign(user, payload);
    return await this._repository.save(user);
  }

  async findByIdWithRelations(user_id) {
    const user = await this._repository.findOne({
      where: { user_id },
      // "userInterests", "userInterests.interest"
      relations: ["user_roles"],
    });
    return user;
  }

  async findByUserTypeId(id) {
    const user = await this._repository.findOne({
      where: { id },
    });
    return user;
  }

  async findAll() {
    const user = await this._repository.find();
    return user;
  }
}

module.exports = new UserRepository();

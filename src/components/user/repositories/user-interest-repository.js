const { AppDataSource } = require("../../../config/database");
const { UserInterest } = require("../entities/user-interest");

class UserInterestRepository {
  _repository = AppDataSource.getRepository(UserInterest);
  async findAll() {
    const interests = this._repository.find();
    return interests;
  }
  async create(payload) {
    const user = this._repository.create(payload);
    const response = await this._repository.save(user);
    return response;
  }
  async save(userId, interestId) {
    await this._repository.save({
      user: { user_id: userId },
      interest: { id: interestId },
    });
  }

  async findByUserAndInterest(userId, interestId) {
    const response = await this._repository.findOne({
      where: {
        user: { user_id: userId },
        interest: { id: interestId },
      },
    });
    return response;
  }

  async deleteById(user_id) {
    const user = await this._repository.delete({ user_id });
    return user;
  }
}

module.exports = new UserInterestRepository();

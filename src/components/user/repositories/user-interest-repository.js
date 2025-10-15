const { AppDataSource } = require("../../../config/database");
const { UserInterest } = require("../entities/user-interest");

class UserInterestRepository {
  _repository = AppDataSource.getRepository(UserInterest);
  async findAll() {
    const interests = this._repository.find();
    return interests;
  }
  async deleteById(user_id) {
    const user = await this._repository.delete({ user_id });
    return user;
  }
}

export default new UserInterestRepository();

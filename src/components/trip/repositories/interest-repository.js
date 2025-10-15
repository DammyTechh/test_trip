const { AppDataSource } = require("../../../config/database");
const { Interest } = require("../entities/trip-interest");

class InterestRepository {
  _repository = AppDataSource.getRepository(Interest);
  async findAll() {
    const response = await this._repository.find();
    return response;
  }
}

export default new InterestRepository();

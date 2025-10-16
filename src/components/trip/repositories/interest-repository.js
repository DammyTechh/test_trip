const { AppDataSource } = require("../../../config/database");
const { Interest } = require("../entities/interest");

class InterestRepository {
  _repository = AppDataSource.getRepository(Interest);
  async findAll() {
    const response = await this._repository.find({});
    return response;
  }
  async findById(id) {
    const response = await this._repository.findOneBy({ id });
    return response;
  }
 
}

module.exports = new InterestRepository();

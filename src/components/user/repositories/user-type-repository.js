const { AppDataSource } = require("../../../config/database");
const { UserType } = require("../../user/entities/user-type");

class UserTypeRepository {
  _repository = AppDataSource.getRepository(UserType);
  async findAll() {
    const response = await this._repository.find({});
    return response;
  }
  async findById(userTypeId) {
    const response = await this._repository.findOneBy({ id: userTypeId });
    return response;
  }
}

module.exports = new UserTypeRepository();

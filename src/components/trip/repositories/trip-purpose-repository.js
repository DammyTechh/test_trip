const { AppDataSource } = require("../../../config/database");
const { TripPurpose } = require("../entities/trip-purpose");

class TripPurposeRepository {
  _repository = AppDataSource.getRepository(TripPurpose);
  async findAll() {
    const response = await this._repository.find();
    return response;
  }
}

module.exports = new  TripPurposeRepository();

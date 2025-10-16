const { AppDataSource } = require("../../../config/database");
const { UserDestinationSpecialties } = require("../entities/user-destination-specialties");

class UserDestinationSpecialtyRepository {
  _repository = AppDataSource.getRepository(UserDestinationSpecialties);

  async save(userId, payload) {
    await this._repository.save({
      user: { user_id: userId },
      ...payload
    });
    // return await this._repository.findOne({
    //   where: { id: saved.id },
    //   relations: ["user"],
    // });
  }
}

module.exports = new UserDestinationSpecialtyRepository();

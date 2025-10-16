const response = require("../../../utils/controller-response");
const OnboardingService = require("../services/user-service");

class OnboardingController {
  static async updateUserDetails(req, res) {
    try {
      const { statusCode, message, data } =
        await OnboardingService.updateUserDetails(req.body);
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }

  static async addUserType(req, res) {
    try {
      const { statusCode, message, data } = await OnboardingService.addUserType(
        req.body
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }

  static async updatePlannerDetails(req,res) {
    try {
      const { statusCode, message, data } = await OnboardingService.updatePlannerDetails(
        req.user.user_id,
        req.body
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }

  static async getUser(req, res) {
    try {
      const { statusCode, message, data } = await OnboardingService.getUserById(
        req.user.user_id
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Get user controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }
    static async getUserById(req, res) {
    try {
      const { statusCode, message, data } = await OnboardingService.getUserById(
        req.params.user_id
      );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Get user controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }

  static async getAllInterests(req, res) {
    try {
      const { statusCode, message, data } =
        await OnboardingService.getAllInterests(req.body);
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }

  static async selectInterest(req, res) {
    try {
      const { statusCode, message, data } =
        await OnboardingService.selectInterests(req.body, req.user);
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update controller error:", error);
      return response(res, 500, "Something went wrong");
    }
  }

  static async updateTripPurpose(req, res) {
    try {
      const result = await OnboardingService.updateTripPurpose(
        req.user.user_id,
        req.body
      );
      return response(res, 200, result.message);
    } catch (error) {
      console.error("Update trip purpose controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }

  static async getUserTypes(req, res) {
    try {
      const { statusCode, message, data } =
        await OnboardingService.getUserTypes();
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Get user types controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }
}
module.exports = OnboardingController;

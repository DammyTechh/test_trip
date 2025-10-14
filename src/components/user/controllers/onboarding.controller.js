const onboardingService = require("../services/onboarding.service");
const response = require("../../../utils/controller-response");

class OnboardingController {
  static async getUserProfile(req, res) {
    try {
      const response = await onboardingService.getUserProfile(
        req?.user?.user_id
      );
      const { statusCode, message, data } = response;
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Get user profile controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }
  static async updateUserType(req, res) {
    try {
      const { statusCode, message, data } =
        await onboardingService.updateUserType(
          req.user.user_id,
          req.body.user_type_id
        );
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update user type controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }
  static async updateUserInterests(req, res) {
    try {
      const userId = req.user.user_id;
      const { interestIds } = req.body;
      const { statusCode, message, data } =
        await onboardingService.updateUserInterests(userId, interestIds);
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update user interests controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }

  static async updateTravelPreferences(req, res) {
    try {
      const userId = req.user.user_id;
      const { statusCode, message, data } =
        await onboardingService.updateTravelPreferences(userId, req.body);
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Update travel preferences controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }

  static async updateTripPurpose(req, res) {
    try {
      const userId = req.user.user_id;
      const result = await onboardingService.updateTripPurpose(
        userId,
        req.body
      );
      return response(res, 200, result.message);
    } catch (error) {
      console.error("Update trip purpose controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }

  static async updatePlannerProfile(req, res) {
    try {
      const userId = req.user.user_id;
      const plannerData = req.body;

      const result = await onboardingService.updatePlannerProfile(
        userId,
        plannerData
      );
      return response(res, 200, result.message);
    } catch (error) {
      console.error("Update planner profile controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }

  static async completeOnboarding(req, res) {
    try {
      const userId = req.user.user_id;
      const result = await onboardingService.completeOnboarding(userId);

      if (!result.success) {
        return response(res, result.status, result.message);
      }

      return response(res, 200, result.message);
    } catch (error) {
      console.error("Complete onboarding controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }

  static async getUserTypes(req, res) {
    try {
      const result = await onboardingService.getAllUserTypes();

      if (!result.success) {
        return response(res, result.status, result.message);
      }

      return response(res, 200, result.message, result.data);
    } catch (error) {
      console.error("Get user types controller error:", error);
      return errorResponseMsg(res, 500, "An unexpected error occurred.");
    }
  }

  static async getInterests(req, res) {
    try {
      const result = await onboardingService.getAllInterests();
      return response(res, 200, result.message, result.data);
    } catch (error) {
      console.error("Get interests controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }

  static async getTripPurposes(req, res) {
    try {
      const { statusCode, message, data } =
        await onboardingService.getAllTripPurposes();
      return response(res, statusCode, message, data);
    } catch (error) {
      console.error("Get trip purposes controller error:", error);
      return response(res, 500, "An unexpected error occurred.");
    }
  }
}
export default OnboardingController;

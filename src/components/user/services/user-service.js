const userTypeRepository = require("../repositories/user-type-repository");
const userRepository = require("../repositories/user-repository");
const CustomResponse = require("../../../utils/custom-response");
const userInterestRepository = require("../repositories/user-interest-repository");
const tripPurposeRepository = require("../../trip/repositories/trip-purpose-repository");
const interestRepository = require("../../trip/repositories/interest-repository");

class OnboardingService extends CustomResponse {
  constructor(statusCode, message, data) {
    super(statusCode, message, data);
  }
  static async getUserProfile(userId) {
    try {
      const user = await userRepository.findByIdWithRelations(userId);
      if (!user) return this._response(404, "User Not Found");
      const {
        password,
        verification_token,
        verification_code,
        ...userProfile
      } = user;

      return this._response(200, "User Profile retrieved successfully", {
        user: userProfile,
      });
    } catch (err) {
      return this._response(500, "Failed to retrieve user profile.");
    }
  }
  static async updateUserType(userId, userTypeId) {
    try {
      const userType = await userRepository.findByUserTypeId(userTypeId);
      if (!userType) return this.response(404, "User type not found");
      const user = await userRepository.findById(userId);
      if (!user) return this.response(404, "User type not found");
      await userRepository.updateById(user.user_id, { usertype_id: userType });
      return this.response(200, "User Type Updated Successfully");
    } catch (err) {
      return this.response(500, "Failed to update user type");
    }
  }
  static async updateUserInterests(userId, interestIds) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) return this.response(404, "User not found.");
      await userInterestRepository.deleteById(user.user_id);
      const userInterests = interestIds.map((interestId) => ({
        user_id: userId,
        interest_id: interestId,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      await userInterestRepository.save(userInterests);
      return this.response(200, "User interests updated successfully.");
    } catch (err) {
      return this.response(500, "Failed to update user interests.");
    }
  }
  static async updateTravelPreferences(userId, body) {
    try {
      const { travel_frequency, budget_range } = body;
      const user = await userRepository.findById(userId);
      if (!user) return this.response(false, 404, "User not found.");

      await userRepository.update(userId, {
        travel_frequency,
        budget_range,
      });

      return this.response(200, "Travel preferences updated successfully.");
    } catch (error) {
      console.error("Update travel preferences error:", error);
      return this.response(500, "Failed to update travel preferences.");
    }
  }
  static async completeOnboarding(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) return this.response(false, 404, "User not found.");
      await userRepository.updateById(userId, {
        is_onboarded: true,
        updated_at: new Date(),
      });

      return this.response(true, 200, "Onboarding completed successfully.");
    } catch (error) {
      console.error("Complete onboarding error:", error);
      return this.response(false, 500, "Failed to complete onboarding.");
    }
  }
  static async getAllUser() {
    try {
      const userTypes = await userTypeRepository.findAll();
      return this.response(200, "User types retrieved successfully.", {
        userTypes,
      });
    } catch (error) {
      console.error("Get user types error:", error);
      return this.response(500, "Failed to retrieve user types.");
    }
  }
  static async getAllInterests() {
    try {
      const interests = interestRepository.findAll();
      return this.response(200, "Interests retrieved successfully.", {
        interests,
      });
    } catch (error) {
      console.error("Get interests error:", error);
      return this.response(500, "Failed to retrieve interests.");
    }
  }
  static async updateTripPurpose(userId, body) {
    try {
      const { trip_purpose } = body;
      const user = await userRepository.findById(userId);
      if (!user) return this.response(404, "User not found.");
      await userRepository.updateById(userId, {
        trip_purpose,
      });

      return this.response(200, "Trip purpose updated successfully.");
    } catch (error) {
      console.error("Update trip purpose error:", error);
      return response(500, "Failed to update trip purpose.");
    }
  }
  static async updatePlannerProfile(userId, body) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return this.response(false, 404, "User not found.");
      }
      await userRepository.update(userId, body);

      return this.response(200, "Planner profile updated successfully.");
    } catch (error) {
      console.error("Update planner profile error:", error);
      return this.response(500, "Failed to update planner profile.");
    }
  }
  static async getAllTripPurposes() {
    try {
      const purposes = await tripPurposeRepository.findAll();
      return this.response(
        200,
        "Trip purposes retrieved successfully.",
        purposes
      );
    } catch (error) {
      console.error("Get trip purposes error:", error);
      return this.response(500, "Failed to retrieve trip purposes.");
    }
  }
}

export default OnboardingService;

const userTypeRepository = require("../repositories/user-type-repository");
const userRepository = require("../repositories/user-repository");
const CustomResponse = require("../../../utils/custom-response");
const userInterestRepository = require("../repositories/user-interest-repository");
const tripPurposeRepository = require("../../trip/repositories/trip-purpose-repository");
const interestRepository = require("../../trip/repositories/interest-repository");
const { hashPassword, jwtSign } = require("../../../utils/helper");
const userRoleRepository = require("../repositories/user-role-repository");
const { OnboardingSteps } = require("../../../utils/onboarding-steps");
const userDestinationSpecialtyRepository = require("../repositories/user-destination-specialty-repository");

class OnboardingService extends CustomResponse {
  constructor(statusCode, message, data) {
    super(statusCode, message, data);
  }

  static async updateUserDetails(body) {
    try {
      const { password, ...rest } = body;
      const existingUser = await userRepository.findByEmail(body.email);
      if (!existingUser) return this.response(401, "User Not Found");
      if (!existingUser.is_verified)
        return this.response(400, "Account Not Verified");
      const hashedPassword = hashPassword(password);
      const user = await userRepository.updateById(existingUser.user_id, {
        ...rest,
        password: hashedPassword,
        onboarding_step: 2,
      });
      const token = jwtSign({
        user_id: user.user_id,
        email: user.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
      });
      return this.response(201, "Details updated successfully.", {
        token,
        user,
      });
    } catch (error) {
      console.log(error, "error");
      return this.response(500, "Something went wrong");
    }
  }

  static async getUserTypes() {
    try {
      const userTypes = await userTypeRepository.findAll();
      return this.response(200, "User types fetched successfully", userTypes);
    } catch (err) {
      return this.response(500, "Failed to retrieve user profile.");
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
      const interests = await interestRepository.findAll();
      return this.response(200, "Interests retrieved successfully.", interests);
    } catch (error) {
      console.error("Get interests error:", error);
      return this.response(500, "Failed to retrieve interests.");
    }
  }

  static async getUserById(userId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) return this.response(400, "User not found");
      return this.response(200, "User retrieved successfully.", user);
    } catch (error) {
      console.error("Get User error:", error);
      return this.response(500, "Failed to retrieve user.");
    }
  }

  static async addUserType(body) {
    try {
      const user = await userRepository.findByEmail(body.email);
      if (!user) return this.response(400, "User not found");

      const userType = await userTypeRepository.findById(body.user_type_id);
      if (!userType) return this.response(404, "User type not found");

      const existingRole = await userRoleRepository.findByUserId(user.user_id);

      if (existingRole) {
        existingRole.user_type = { id: body.user_type_id };
        const updatedRole = await userRoleRepository.updateById(
          existingRole.id,
          existingRole
        );
        return this.response(
          200,
          "User type updated successfully.",
          updatedRole
        );
      }

      // Create a new one if none exists
      const newRole = await userRoleRepository.save(
        user.user_id,
        body.user_type_id
      );
      return this.response(200, "User type added successfully.", newRole);
    } catch (error) {
      console.error("Add User Type Error:", error);
      return this.response(500, "Failed to assign user type.");
    }
  }

  static async selectInterests(body, user) {
    try {
      const { interest_ids, ...rest } = body;
      await Promise.all(
        interest_ids.map(async (interestId) => {
          const interestExist = await interestRepository.findById(interestId);
          if (!interestExist) return;
          const userHasInterest =
            await userInterestRepository.findByUserAndInterest(
              user.user_id,
              interestId
            );
          if (userHasInterest) return;

          // Create the link between user and interest
          await userInterestRepository.save(user.userId, interestId);
        })
      );
      await userRepository.updateById(user.user_id, { ...rest });
      return this.response(200, "Interests selected successfully.");
    } catch (error) {
      console.error("Get interests error:", error);
      return this.response(500, "Failed to retrieve interests.");
    }
  }
  static async updatePlannerDetails(userId, body) {
    try {
      const user = await userRepository.findById(userId);
      const {
        destination_specialties,
        planning_experience_years,
        planning_rate,
      } = body;
      if (!user) return this.response(404, "User not found.");
      await Promise.all(
        destination_specialties.map((destination) =>
          userDestinationSpecialtyRepository.save(user.user_id, {
            name: destination,
          })
        )
      );
      await userRepository.updateById(user.user_id, {
        planning_experience_years,
        planning_rate,
        onboarding_step: OnboardingSteps.PLANNER_DETAILS,
      });
      return this.response(200, "User Details updated successfully.");
    } catch (error) {
      console.error("Update planner details error:", error);
      return this.response(500, "Failed to update planner details.");
    }
  }
  static async updateTripPurpose(userId, body) {
    try {
      const { trip_purpose } = body;
      const user = await userRepository.findById(userId);
      if (!user) return this.response(404, "User not found.");
      await userRepository.updateById(user.user_id, {
        trip_purpose,
        onboarding_step: OnboardingSteps.FINISHED,
      });
      return this.response(200, "Trip purpose updated successfully.");
    } catch (error) {
      console.error("Update trip purpose error:", error);
      return this.response(500, "Failed to update trip purpose.");
    }
  }
}

module.exports = OnboardingService;

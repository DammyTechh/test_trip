const onboardingService = require('../services/onboarding.service');
const {
  successResponseMsg,
  errorResponseMsg,
} = require('../utils/response');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const result = await onboardingService.getUserProfile(userId);

    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }

    return successResponseMsg(res, 200, result.message, result.data);
  } catch (error) {
    console.error('Get user profile controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const updateUserType = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { userTypeId } = req.body;

    if (!userTypeId) {
      return errorResponseMsg(res, 400, 'User type ID is required.');
    }

    const result = await onboardingService.updateUserType(userId, userTypeId);

    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }

    return successResponseMsg(res, 200, result.message);
  } catch (error) {
    console.error('Update user type controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const updateUserInterests = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { interestIds } = req.body;

    if (!interestIds || !Array.isArray(interestIds)) {
      return errorResponseMsg(res, 400, 'Interest IDs must be provided as an array.');
    }

    const result = await onboardingService.updateUserInterests(userId, interestIds);

    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }

    return successResponseMsg(res, 200, result.message);
  } catch (error) {
    console.error('Update user interests controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const completeOnboarding = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const result = await onboardingService.completeOnboarding(userId);

    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }

    return successResponseMsg(res, 200, result.message);
  } catch (error) {
    console.error('Complete onboarding controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const getUserTypes = async (req, res) => {
  try {
    const result = await onboardingService.getAllUserTypes();

    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }

    return successResponseMsg(res, 200, result.message, result.data);
  } catch (error) {
    console.error('Get user types controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

const getInterests = async (req, res) => {
  try {
    const result = await onboardingService.getAllInterests();

    if (!result.success) {
      return errorResponseMsg(res, result.status, result.message);
    }

    return successResponseMsg(res, 200, result.message, result.data);
  } catch (error) {
    console.error('Get interests controller error:', error);
    return errorResponseMsg(res, 500, 'An unexpected error occurred.');
  }
};

module.exports = {
  getUserProfile,
  updateUserType,
  updateUserInterests,
  completeOnboarding,
  getUserTypes,
  getInterests,
};
const { 
  getUserRepository, 
  getUserTypeRepository, 
  getInterestRepository, 
  getUserInterestRepository 
} = require('../models');
const { serviceResponse } = require('../utils/response');

const getUserProfile = async (userId) => {
  try {
    const userRepository = getUserRepository();
    
    const user = await userRepository.findOne({
      where: { user_id: userId },
      relations: ['userType', 'userInterests', 'userInterests.interest'],
    });

    if (!user) {
      return serviceResponse(false, 404, 'User not found.');
    }

    
    const { password, verification_token, ...userProfile } = user;

    return serviceResponse(true, 200, 'User profile retrieved successfully.', { user: userProfile });
  } catch (error) {
    console.error('Get user profile error:', error);
    return serviceResponse(false, 500, 'Failed to retrieve user profile.');
  }
};

const updateUserType = async (userId, userTypeId) => {
  try {
    const userTypeRepository = getUserTypeRepository();
    const userRepository = getUserRepository();
    
    const userType = await userTypeRepository.findOne({ where: { id: userTypeId } });
    if (!userType) {
      return serviceResponse(false, 404, 'User type not found.');
    }

    const user = await userRepository.findOne({ where: { user_id: userId } });
    if (!user) {
      return serviceResponse(false, 404, 'User not found.');
    }

    await userRepository.update(
      { user_id: userId },
      { 
        usertype_id: userTypeId,
        updated_at: new Date()
      }
    );

    return serviceResponse(true, 200, 'User type updated successfully.');
  } catch (error) {
    console.error('Update user type error:', error);
    return serviceResponse(false, 500, 'Failed to update user type.');
  }
};

const updateUserInterests = async (userId, interestIds) => {
  try {
    const userRepository = getUserRepository();
    const userInterestRepository = getUserInterestRepository();
    
    const user = await userRepository.findOne({ where: { user_id: userId } });
    if (!user) {
      return serviceResponse(false, 404, 'User not found.');
    }

  
    await userInterestRepository.delete({ user_id: userId });

    
    const userInterests = interestIds.map(interestId => ({
      user_id: userId,
      interest_id: interestId,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await userInterestRepository.save(userInterests);

    return serviceResponse(true, 200, 'User interests updated successfully.');
  } catch (error) {
    console.error('Update user interests error:', error);
    return serviceResponse(false, 500, 'Failed to update user interests.');
  }
};

const completeOnboarding = async (userId) => {
  try {
    const userRepository = getUserRepository();
    const user = await userRepository.findOne({ where: { user_id: userId } });
    if (!user) {
      return serviceResponse(false, 404, 'User not found.');
    }

    await userRepository.update(
      { user_id: userId },
      { 
        is_onboarded: true,
        updated_at: new Date()
      }
    );

    return serviceResponse(true, 200, 'Onboarding completed successfully.');
  } catch (error) {
    console.error('Complete onboarding error:', error);
    return serviceResponse(false, 500, 'Failed to complete onboarding.');
  }
};

const getAllUserTypes = async () => {
  try {
    const userTypeRepository = getUserTypeRepository();
    const userTypes = await userTypeRepository.find();
    return serviceResponse(true, 200, 'User types retrieved successfully.', { userTypes });
  } catch (error) {
    console.error('Get user types error:', error);
    return serviceResponse(false, 500, 'Failed to retrieve user types.');
  }
};

const getAllInterests = async () => {
  try {
    const interestRepository = getInterestRepository();
    const interests = await interestRepository.find();
    return serviceResponse(true, 200, 'Interests retrieved successfully.', { interests });
  } catch (error) {
    console.error('Get interests error:', error);
    return serviceResponse(false, 500, 'Failed to retrieve interests.');
  }
};

module.exports = {
  getUserProfile,
  updateUserType,
  updateUserInterests,
  completeOnboarding,
  getAllUserTypes,
  getAllInterests,
};
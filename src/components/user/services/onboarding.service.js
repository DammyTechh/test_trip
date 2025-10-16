// const { 
//   getUserRepository, 
//   getUserTypeRepository, 
//   getInterestRepository, 
//   getUserInterestRepository 
// } = require('../models');
// const { serviceResponse } = require('../utils/response');

// const getUserProfile = async (userId) => {
//   try {
//     const userRepository = getUserRepository();
    
    // const user = await userRepository.findOne({
    //   where: { user_id: userId },
    //   relations: ['userType', 'userInterests', 'userInterests.interest'],
    // });

//     if (!user) {
//       return serviceResponse(false, 404, 'User not found.');
//     }

//     // Remove sensitive data
//     const { password, verification_token, verification_code, ...userProfile } = user;

//     return serviceResponse(true, 200, 'User profile retrieved successfully.', { user: userProfile });
//   } catch (error) {
//     console.error('Get user profile error:', error);
//     return serviceResponse(false, 500, 'Failed to retrieve user profile.');
//   }
// };

// const updateUserType = async (userId, userTypeId) => {
//   try {
//     const userTypeRepository = getUserTypeRepository();
//     const userRepository = getUserRepository();
    
//     const userType = await userTypeRepository.findOne({ where: { id: userTypeId } });
//     if (!userType) {
//       return serviceResponse(false, 404, 'User type not found.');
//     }

//     const user = await userRepository.findOne({ where: { user_id: userId } });
//     if (!user) {
//       return serviceResponse(false, 404, 'User not found.');
//     }

//     await userRepository.update(
//       { user_id: userId },
//       { 
//         usertype_id: userTypeId,
//         updated_at: new Date()
//       }
//     );

//     return serviceResponse(true, 200, 'User type updated successfully.');
//   } catch (error) {
//     console.error('Update user type error:', error);
//     return serviceResponse(false, 500, 'Failed to update user type.');
//   }
// };

// const updateUserInterests = async (userId, interestIds) => {
//   try {
//     const userRepository = getUserRepository();
//     const userInterestRepository = getUserInterestRepository();
    
//     const user = await userRepository.findOne({ where: { user_id: userId } });
//     if (!user) {
//       return serviceResponse(false, 404, 'User not found.');
//     }

//     // Remove existing interests
//     await userInterestRepository.delete({ user_id: userId });

//     // Add new interests
//     const userInterests = interestIds.map(interestId => ({
//       user_id: userId,
//       interest_id: interestId,
//       created_at: new Date(),
//       updated_at: new Date()
//     }));

//     await userInterestRepository.save(userInterests);

//     return serviceResponse(true, 200, 'User interests updated successfully.');
//   } catch (error) {
//     console.error('Update user interests error:', error);
//     return serviceResponse(false, 500, 'Failed to update user interests.');
//   }
// };

// const updateTravelPreferences = async (userId, preferences) => {
//   try {
//     const userRepository = getUserRepository();
//     const { travelFrequency, budgetRange } = preferences;
    
//     const user = await userRepository.findOne({ where: { user_id: userId } });
//     if (!user) {
//       return serviceResponse(false, 404, 'User not found.');
//     }

//     await userRepository.update(
//       { user_id: userId },
//       { 
//         travel_frequency: travelFrequency,
//         budget_range: budgetRange,
//         updated_at: new Date()
//       }
//     );

//     return serviceResponse(true, 200, 'Travel preferences updated successfully.');
//   } catch (error) {
//     console.error('Update travel preferences error:', error);
//     return serviceResponse(false, 500, 'Failed to update travel preferences.');
//   }
// };

// const completeOnboarding = async (userId) => {
//   try {
//     const userRepository = getUserRepository();
//     const user = await userRepository.findOne({ where: { user_id: userId } });
//     if (!user) {
//       return serviceResponse(false, 404, 'User not found.');
//     }

//     await userRepository.update(
//       { user_id: userId },
//       { 
//         is_onboarded: true,
//         updated_at: new Date()
//       }
//     );

//     return serviceResponse(true, 200, 'Onboarding completed successfully.');
//   } catch (error) {
//     console.error('Complete onboarding error:', error);
//     return serviceResponse(false, 500, 'Failed to complete onboarding.');
//   }
// };

// const getAllUserTypes = async () => {
//   try {
//     const userTypeRepository = getUserTypeRepository();
//     const userTypes = await userTypeRepository.find();
//     return serviceResponse(true, 200, 'User types retrieved successfully.', { userTypes });
//   } catch (error) {
//     console.error('Get user types error:', error);
//     return serviceResponse(false, 500, 'Failed to retrieve user types.');
//   }
// };

// const getAllInterests = async () => {
//   try {
//     const interestRepository = getInterestRepository();
//     const interests = await interestRepository.find();
//     return serviceResponse(true, 200, 'Interests retrieved successfully.', { interests });
//   } catch (error) {
//     console.error('Get interests error:', error);
//     return serviceResponse(false, 500, 'Failed to retrieve interests.');
//   }
// };

// const updateTripPurpose = async (userId, tripPurpose) => {
//   try {
//     const userRepository = getUserRepository();
//     const user = await userRepository.findOne({ where: { user_id: userId } });
//     if (!user) {
//       return serviceResponse(false, 404, 'User not found.');
//     }

//     await userRepository.update(
//       { user_id: userId },
//       { 
//         trip_purpose: tripPurpose,
//         updated_at: new Date()
//       }
//     );

//     return serviceResponse(true, 200, 'Trip purpose updated successfully.');
//   } catch (error) {
//     console.error('Update trip purpose error:', error);
//     return serviceResponse(false, 500, 'Failed to update trip purpose.');
//   }
// };

// const updatePlannerProfile = async (userId, plannerData) => {
//   try {
//     const userRepository = getUserRepository();
//     const { destinationSpecialties, planningExperienceYears, planningRate } = plannerData;
    
//     const user = await userRepository.findOne({ where: { user_id: userId } });
//     if (!user) {
//       return serviceResponse(false, 404, 'User not found.');
//     }

//     await userRepository.update(
//       { user_id: userId },
//       { 
//         destination_specialties: destinationSpecialties,
//         planning_experience_years: planningExperienceYears,
//         planning_rate: planningRate,
//         updated_at: new Date()
//       }
//     );

//     return serviceResponse(true, 200, 'Planner profile updated successfully.');
//   } catch (error) {
//     console.error('Update planner profile error:', error);
//     return serviceResponse(false, 500, 'Failed to update planner profile.');
//   }
// };

// const getAllTripPurposes = async () => {
//   try {
//     const tripPurposeRepository = getTripPurposeRepository();
//     const purposes = await tripPurposeRepository.find();
//     return serviceResponse(true, 200, 'Trip purposes retrieved successfully.', { purposes });
//   } catch (error) {
//     console.error('Get trip purposes error:', error);
//     return serviceResponse(false, 500, 'Failed to retrieve trip purposes.');
//   }
// };

// module.exports = {
//   getUserProfile,
//   updateUserType,
//   updateUserInterests,
//   updateTravelPreferences,
//   updateTripPurpose,
//   updatePlannerProfile,
//   completeOnboarding,
//   getAllUserTypes,
//   getAllInterests,
//   getAllTripPurposes,
// };
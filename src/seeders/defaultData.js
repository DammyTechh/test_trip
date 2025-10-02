const { getUserTypeRepository, getInterestRepository, getTripPurposeRepository } = require('../models');

const seedDefaultData = async () => {
  try {
    const userTypeRepository = getUserTypeRepository();
    const interestRepository = getInterestRepository();
    const tripPurposeRepository = getTripPurposeRepository();

    const userTypes = [
      {
        id: 1,
        name: 'Traveller',
        description: 'Plan trip yourself',
      },
      {
        id: 2,
        name: 'Planner',
        description: 'Professional trip planner',
      },
      {
        id: 3,
        name: 'Both',
        description: 'Traveller & Planner',
      },
    ];

    for (const userType of userTypes) {
      const existingUserType = await userTypeRepository.findOne({ where: { id: userType.id } });
      if (!existingUserType) {
        await userTypeRepository.save({
          ...userType,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    const interests = [
      {
        name: 'Adventure & Outdoor',
        description: 'Hiking, camping, extreme sports, outdoor adventures',
        icon: 'adventure',
      },
      {
        name: 'Culture & History',
        description: 'Museums, historical sites, cultural experiences',
        icon: 'culture',
      },
      {
        name: 'Food & Dining',
        description: 'Culinary experiences, local cuisine, restaurants',
        icon: 'food',
      },
      {
        name: 'Nightlife & Entertainment',
        description: 'Bars, clubs, entertainment venues, nightlife',
        icon: 'nightlife',
      },
      {
        name: 'Photography',
        description: 'Scenic spots, photo opportunities, landscapes',
        icon: 'photography',
      },
      {
        name: 'Wellness & Relaxation',
        description: 'Spa, wellness, peaceful locations, meditation',
        icon: 'wellness',
      },
      {
        name: 'Business Travel',
        description: 'Business meetings, conferences, work travel',
        icon: 'business',
      },
      {
        name: 'Family Friendly',
        description: 'Kid-friendly activities, family attractions',
        icon: 'family',
      },
    ];

    for (const interest of interests) {
      const existingInterest = await interestRepository.findOne({ where: { name: interest.name } });
      if (!existingInterest) {
        await interestRepository.save({
          ...interest,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    
    const tripPurposes = [
      {
        purpose_name: 'Planning a vacation',
        description: 'Short-term stays for your holiday',
        icon: 'vacation',
      },
      {
        purpose_name: 'Looking for a temporary stay',
        description: 'For work, study, or transitions',
        icon: 'temporary',
      },
      {
        purpose_name: 'Considering a relocation',
        description: 'Find a new place to call home',
        icon: 'relocation',
      },
      {
        purpose_name: 'Just exploring',
        description: 'Browse and see what\'s possible',
        icon: 'exploring',
      },
    ];

    for (const purpose of tripPurposes) {
      const existingPurpose = await tripPurposeRepository.findOne({ where: { purpose_name: purpose.purpose_name } });
      if (!existingPurpose) {
        await tripPurposeRepository.save({
          ...purpose,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    console.log('✅ Default data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding default data:', error);
  }
};

module.exports = { seedDefaultData };
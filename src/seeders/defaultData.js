const { getUserTypeRepository, getInterestRepository } = require('../models');

const seedDefaultData = async () => {
  try {
    const userTypeRepository = getUserTypeRepository();
    const interestRepository = getInterestRepository();

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
        name: 'Tourism',
        description: 'General sightseeing and tourist activities',
      },
      {
        name: 'Cultural & History',
        description: 'Museums, historical sites, cultural experiences',
      },
      {
        name: 'Adventure',
        description: 'Outdoor adventures, hiking, extreme sports',
      },
      {
        name: 'Food & Dining',
        description: 'Culinary experiences and local cuisine',
      },
      {
        name: 'Shopping',
        description: 'Shopping districts, markets, boutiques',
      },
      {
        name: 'Nightlife',
        description: 'Bars, clubs, entertainment venues',
      },
      {
        name: 'Business',
        description: 'Business travel and conferences',
      },
      {
        name: 'Relaxation',
        description: 'Spa, wellness, peaceful locations',
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

    console.log('Default data seeded successfully');
  } catch (error) {
    console.error('Error seeding default data:', error);
  }
};

module.exports = { seedDefaultData };
const { AppDataSource } = require('../config/database');

const getUserRepository = () => AppDataSource.getRepository('User');
const getUserTypeRepository = () => AppDataSource.getRepository('UserType');
const getInterestRepository = () => AppDataSource.getRepository('Interest');
const getUserInterestRepository = () => AppDataSource.getRepository('UserInterest');
const getTripPurposeRepository = () => AppDataSource.getRepository('TripPurpose');
const getTripFrequencyRepository = () => AppDataSource.getRepository('TripFrequency');
const getTripLocationRepository = () => AppDataSource.getRepository('TripLocation');
const getDerivedValuesByLocationRepository = () => AppDataSource.getRepository('DerivedValuesByLocation');
const getTripMadeByRepository = () => AppDataSource.getRepository('TripMadeBy');
const getTripStatusRepository = () => AppDataSource.getRepository('TripStatus');
const getTripTransportationModeRepository = () => AppDataSource.getRepository('TripTransportationMode');
const getTripRepository = () => AppDataSource.getRepository('Trip');
const getTripActivityRepository = () => AppDataSource.getRepository('TripActivity');
const getActivityCategoryRepository = () => AppDataSource.getRepository('ActivityCategory');
const getTripShareRepository = () => AppDataSource.getRepository('TripShare');
const getTripActivityStatusRepository = () => AppDataSource.getRepository('TripActivityStatus');
const getTripActivityUpdateRepository = () => AppDataSource.getRepository('TripActivityUpdate');

module.exports = {
  AppDataSource,
  getUserRepository,
  getUserTypeRepository,
  getInterestRepository,
  getUserInterestRepository,
  getTripPurposeRepository,
  getTripFrequencyRepository,
  getTripLocationRepository,
  getDerivedValuesByLocationRepository,
  getTripMadeByRepository,
  getTripStatusRepository,
  getTripTransportationModeRepository,
  getTripRepository,
  getTripActivityRepository,
  getActivityCategoryRepository,
  getTripShareRepository,
  getTripActivityStatusRepository,
  getTripActivityUpdateRepository,
};
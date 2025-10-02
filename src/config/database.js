const { DataSource } = require('typeorm');
require('dotenv').config();

const { User } = require('../entities/User');
const { UserType } = require('../entities/UserType');
const { Interest } = require('../entities/Interest');
const { UserInterest } = require('../entities/UserInterest');
const { TripPurpose } = require('../entities/TripPurpose');
const { TripFrequency } = require('../entities/TripFrequency');
const { TripLocation } = require('../entities/TripLocation');
const { DerivedValuesByLocation } = require('../entities/DerivedValuesByLocation');
const { TripMadeBy } = require('../entities/TripMadeBy');
const { TripStatus } = require('../entities/TripStatus');
const { TripTransportationMode } = require('../entities/TripTransportationMode');
const { Trip } = require('../entities/Trip');
const { TripActivity } = require('../entities/TripActivity');
const { ActivityCategory } = require('../entities/ActivityCategory');
const { TripShare } = require('../entities/TripShare');
const { TripActivityStatus } = require('../entities/TripActivityStatus');
const { TripActivityUpdate } = require('../entities/TripActivityUpdate');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development', 
  logging: process.env.NODE_ENV === 'development',
  entities: [
    User,
    UserType,
    Interest,
    UserInterest,
    TripPurpose,
    TripFrequency,
    TripLocation,
    DerivedValuesByLocation,
    TripMadeBy,
    TripStatus,
    TripTransportationMode,
    Trip,
    TripActivity,
    ActivityCategory,
    TripShare,
    TripActivityStatus,
    TripActivityUpdate
  ],
  subscribers: [],
  migrations: [],
  extra: {
    connectionLimit: 5,
    acquireTimeout: 30000,
    timeout: 60000,
    reconnect: true,
    maxReconnects: 3,
  },
});


const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully with TypeORM');

    
    const result = await AppDataSource.query('SELECT 1+1 as result');
    console.log('✅ Test query executed successfully:', result);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    
    
    if (error.code === 'ER_USER_LIMIT_REACHED') {
      console.error('💡 Solution: Wait for connections to timeout or contact your DBA');
      console.error('💡 Temporary fix: Restart your application after a few minutes');
    }
    throw error;
  }
};


process.on('SIGINT', async () => {
  console.log('\n🔄 Closing database connections...');
  try {
    await AppDataSource.destroy();
    console.log('✅ Database connections closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing connections:', error);
    process.exit(1);
  }
});

module.exports = { AppDataSource, initializeDatabase };
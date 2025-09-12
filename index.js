const express = require('express');
require('reflect-metadata'); 
const { initializeDatabase } = require('./src/config/database');
const { seedDefaultData } = require('./src/seeders/defaultData');
const authRoutes = require('./src/routes/auth.routes');
const onboardingRoutes = require('./src/routes/onboarding.routes');
const notFound = require('./src/middlewares/notFound.middleware');
const errorHandler = require('./src/middlewares/errorHandler.middleware');
const {
  corsOptions,
  securityHeaders,
  sanitizeInput,
  ipWhitelist
} = require('./src/middlewares/security.middleware');
const cors = require('cors');
const { swaggerUi, specs } = require('./src/config/swagger');
require('dotenv').config();

const app = express();
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(ipWhitelist);
app.use(sanitizeInput);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use('/api/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Tripitify API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  },
}));

app.use('/api/onboarding', onboardingRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Tripitify API is running with TypeORM',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: 'MySQL with TypeORM'
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const initializeApp = async () => {
  try {
    await initializeDatabase();
    console.log('✅ TypeORM database connection established successfully.');

    await seedDefaultData();
    console.log('✅ Default data seeded successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Tripitify API server is running on port ${PORT}`);
      console.log(`📊 Health check available at http://localhost:${PORT}/health`);
      console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
      console.log(`🔒 Security features enabled: CORS, Helmet, Rate Limiting, Input Sanitization`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️  Database: MySQL with TypeORM`);
    });
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    process.exit(1);
  }
};

initializeApp();
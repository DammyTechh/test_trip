const express = require("express");
require("reflect-metadata");
const { initializeDatabase } = require("./src/config/database");
// const { seedDefaultData } = require("./src/seeders/defaultData");
const notFound = require("./src/middlewares/notFound.middleware");
const errorHandler = require("./src/middlewares/errorHandler.middleware");
const {
  corsOptions,
  securityHeaders,
  sanitizeInput,
} = require("./src/middlewares/security.middleware");
const cors = require("cors");
const { appEnv } = require("./src/config/variables");
const app = express();
const routes= require('./src/gateway/index');
const morgan= require('morgan');

app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(sanitizeInput);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use('/api', routes);
app.use(morgan("dev"));
app.use(notFound);
app.use(errorHandler);

const PORT = appEnv.PORT || 3000;

const initializeApp = async () => {
  try {
    await initializeDatabase();
    console.log("✅ TypeORM database connection established successfully.");

    // await seedDefaultData();
    console.log("✅ Default data seeded successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Tripitify API server is running on port ${PORT}`);
      console.log(
        `📚 API Documentation available at http://localhost:${PORT}/api/docs`
      );
    });
  } catch (error) {
    console.error("❌ Failed to initialize application:", error);
    process.exit(1);
  }
};

initializeApp();

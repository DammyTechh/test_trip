const { DataSource } = require("typeorm");
const { appEnv } = require("./variables");
const path = require("path");
const fs = require("fs");

const dirPath = path.resolve(__dirname, "../components");
const directories = fs.readdirSync(dirPath);

const entities = [];

directories.forEach((dir) => {
  const entityPath = path.join(dirPath, dir, "entities");

  if (fs.existsSync(entityPath)) {
    const entityFiles = fs.readdirSync(entityPath);

    entityFiles.forEach((file) => {
      if (file.endsWith(".js")) {
        const fullPath = path.join(entityPath, file);
        const moduleExports = require(fullPath);

        Object.values(moduleExports).forEach((exported) => {
          if (
            exported &&
            (exported.constructor.name === "EntitySchema" ||
              typeof exported === "function")
          ) {
            entities.push(exported);
          } else {
            console.warn(
              `⚠️ Skipped invalid export in ${dir}/entities/${file}`
            );
          }
        });
      }
    });
  }
});


const AppDataSource = new DataSource({
  type: "mysql",
  host: appEnv.DB_HOST,
  port: appEnv.DD_PORT || 3306,
  username: appEnv.DB_USER,
  password: appEnv.DB_PASSWORD,
  database: appEnv.DB_NAME,
  synchronize: appEnv.NODE_ENV === "development",
  // logging: appEnv.NODE_ENV === "development",
  logger: false,
  entities,
  subscribers: [],
  migrations: [],
  extra: {
    connectionLimit: 5,
    connectTimeout: 30000
  },
});

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully with TypeORM");

    const result = await AppDataSource.query("SELECT 1+1 as result");
    console.log("✅ Test query executed successfully:", result);
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);

    if (error.code === "ER_USER_LIMIT_REACHED") {
      console.error(
        "💡 Solution: Wait for connections to timeout or contact your DBA"
      );
      console.error(
        "💡 Temporary fix: Restart your application after a few minutes"
      );
    }
    throw error;
  }
};

process.on("SIGINT", async () => {
  console.log("\n🔄 Closing database connections...");
  try {
    await AppDataSource.destroy();
    console.log("✅ Database connections closed gracefully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error closing connections:", error);
    process.exit(1);
  }
});

module.exports = { AppDataSource, initializeDatabase };

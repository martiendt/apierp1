import { BaseCommand } from "@point-hub/express-cli";
import databaseConfig from "@src/config/database.js";
import DatabaseConnection from "@src/database/connection.js";
import MongoDbConnection from "@src/database/mongodb/connection-mongodb.js";

export default class DbSeedCommand extends BaseCommand {
  constructor() {
    super({
      name: "db:seed",
      description: "Seed database",
      summary: "Seed database",
      arguments: [],
      options: [],
    });
  }
  async handle(): Promise<void> {
    const dbConnection = new DatabaseConnection(
      new MongoDbConnection({
        name: databaseConfig[databaseConfig.default].name,
        url: databaseConfig[databaseConfig.default].url,
      })
    );
    dbConnection.database(databaseConfig[databaseConfig.default].name);
    try {
      await dbConnection.open();

      // seed users colllection
      const { userSeeds } = await import("@src/modules/user/model/user.seed.js");
      await dbConnection.collection("users").deleteAll();
      const userData = await dbConnection.collection("users").createMany(userSeeds);
      console.info(`[seed] seeding users data`, userData);

      // seed warehouses colllection
      // const { warehouseSeeds } = await import("@src/modules/warehouse/model/warehouse.seed.js");
      // await dbConnection.collection("warehouses").deleteAll();
      // const warehouseData = await dbConnection.collection("warehouses").createMany(warehouseSeeds);
      // console.info(`[seed] seeding warehouses data`, warehouseData);

      // seed warehouses colllection
      // const { branchSeeds } = await import("@src/modules/branch/model/branch.seed.js");
      // await dbConnection.collection("branches").deleteAll();
      // const branchData = await dbConnection.collection("branches").createMany(branchSeeds);
      // console.info(`[seed] seeding branches data`, branchData);

      // const { settingJournalSeeds } = await import("@src/modules/setting-journal/model/setting-journal.seed.js");
      // await dbConnection.collection("settingJournals").deleteAll();
      // const branchData = await dbConnection.collection("settingJournals").createMany(settingJournalSeeds);
      // console.info(`[seed] seeding settingJournals data`, branchData);
    } catch (error) {
      console.error(error);
    } finally {
      dbConnection.close();
    }
  }
}

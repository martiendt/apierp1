import DatabaseConnection, {
  DeleteOptionsInterface,
  DeleteResultInterface,
  DocumentInterface,
} from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

export class DeleteManySettingJournalRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "settingJournals");
  }

  public async handle(filter: DocumentInterface, options?: DeleteOptionsInterface): Promise<DeleteResultInterface> {
    return await this.databaseManager.deleteMany(filter, options);
  }
}

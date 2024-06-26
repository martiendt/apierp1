import { SettingJournalEntityInterface } from "../setting-journal.entity.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

interface ResponseInterface extends SettingJournalEntityInterface {
  _id: string;
}

export class RetrieveSettingJournalRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "settingJournals");
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    const response: SettingJournalEntityInterface = await this.databaseManager.retrieve(id, options);

    return {
      _id: response._id as string,
      ...response,
    };
  }
}

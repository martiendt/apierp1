import { ExpeditionEntityInterface } from "../expedition.entity.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

interface ResponseInterface extends ExpeditionEntityInterface {
  _id: string;
}

export class RetrieveExpeditionRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "expeditions");
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    const response: ExpeditionEntityInterface = await this.databaseManager.retrieve(id, options);

    return {
      _id: response._id as string,
      ...response,
    };
  }
}

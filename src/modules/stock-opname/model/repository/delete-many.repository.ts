import DatabaseConnection, {
  DeleteOptionsInterface,
  DeleteResultInterface,
  DocumentInterface,
} from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

export class DeleteManyStockOpnameRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "stockOpnames");
  }

  public async handle(filter: DocumentInterface, options?: DeleteOptionsInterface): Promise<DeleteResultInterface> {
    return await this.databaseManager.deleteMany(filter, options);
  }
}

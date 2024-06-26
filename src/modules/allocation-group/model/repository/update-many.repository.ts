import DatabaseConnection, {
  DocumentInterface,
  UpdateManyResultInterface,
  UpdateManyOptionsInterface,
} from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

export class UpdateManyAllocationGroupRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "AllocationGroups");
  }

  public async handle(
    filter: DocumentInterface,
    document: DocumentInterface,
    options?: UpdateManyOptionsInterface
  ): Promise<UpdateManyResultInterface> {
    return await this.databaseManager.updateMany(filter, document, options);
  }
}

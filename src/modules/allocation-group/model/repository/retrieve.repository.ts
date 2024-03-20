import { AllocationGroupEntityInterface } from "../allocation-group.entity.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

interface ResponseInterface extends AllocationGroupEntityInterface {
  _id: string;
}

export class RetrieveAllocationGroupRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "AllocationGroups");
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    const response: AllocationGroupEntityInterface = await this.databaseManager.retrieve(id, options);

    return {
      _id: response._id as string,
      ...response,
    };
  }
}

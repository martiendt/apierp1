import { CustomerEntityInterface } from "../customer.entity.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

interface DataInterface extends CustomerEntityInterface {
  _id: string;
}

interface ResponseInterface {
  data: Array<DataInterface>;
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    totalDocument: number;
  };
}

export class RetrieveAllCustomerRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "customers");
  }

  public async handle(query: QueryInterface, options?: RetrieveAllOptionsInterface): Promise<ResponseInterface> {
    return await this.databaseManager.retrieveAll(query, options);
  }
}

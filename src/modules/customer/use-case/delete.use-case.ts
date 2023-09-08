import { ApiError } from "@point-hub/express-error-handler";
import { DeleteCustomerRepository } from "../model/repository/delete.repository.js";
import DatabaseConnection, { DeleteOptionsInterface, QueryInterface } from "@src/database/connection.js";
import { RetrieveAllPosRepository } from "@src/modules/pos/model/repository/retrieve-all.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class DeleteCustomerUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

      const posData = await new RetrieveAllPosRepository(this.db).handle({
        fields: "",
        filter: {
          customer_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (posData.data.length > 0) {
        throw new ApiError(400);
      }

      const response = await new DeleteCustomerRepository(this.db).handle(id, options);

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}

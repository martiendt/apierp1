import { ApiError } from "@point-hub/express-error-handler";
import { DeleteSupplierRepository } from "../model/repository/delete.repository.js";
import DatabaseConnection, { DeleteOptionsInterface, QueryInterface } from "@src/database/connection.js";
import { RetrieveAllPurchaseRepository } from "@src/modules/purchase/model/repository/retrieve-all.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class DeleteSupplierUseCase {
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

      const purchaseData = await new RetrieveAllPurchaseRepository(this.db).handle({
        fields: "",
        filter: {
          supplier_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);

      if (purchaseData.data.length > 0) {
        throw new ApiError(400);
      }

      const response = await new DeleteSupplierRepository(this.db).handle(id, {
        session: options.session,
      });

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}

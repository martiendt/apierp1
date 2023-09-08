import { ApiError } from "@point-hub/express-error-handler";
import { DeleteWarehouseRepository } from "../model/repository/delete.repository.js";
import DatabaseConnection, { DeleteOptionsInterface, QueryInterface } from "@src/database/connection.js";
import { RetrieveAllInventoryRepository } from "@src/modules/inventory/model/repository/retrieve-all.repository.js";
import { RetrieveAllPurchaseRepository } from "@src/modules/purchase/model/repository/retrieve-all.repository.js";
import { RetrieveAllUserRepository } from "@src/modules/user/model/repository/retrieve-all.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class DeleteWarehouseUseCase {
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
          warehouse_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (purchaseData.data.length > 0) {
        throw new ApiError(400);
      }

      const userData = await new RetrieveAllUserRepository(this.db).handle({
        fields: "",
        filter: {
          warehouse_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (userData.data.length > 0) {
        throw new ApiError(400);
      }

      const inventoryData = await new RetrieveAllInventoryRepository(this.db).handle({
        fields: "",
        filter: {
          warehouse_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (inventoryData.data.length > 0) {
        throw new ApiError(400);
      }

      const response = await new DeleteWarehouseRepository(this.db).handle(id, {
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

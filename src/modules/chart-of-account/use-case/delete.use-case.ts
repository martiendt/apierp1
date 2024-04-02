import { ApiError } from "@point-hub/express-error-handler";
import { DeleteCoaRepository } from "../model/repository/delete.repository.js";
import { RetrieveAllCoaRepository } from "../model/repository/retrieve-all.repository.js";
import DatabaseConnection, { DeleteOptionsInterface, QueryInterface } from "@src/database/connection.js";
import { RetrieveAllCustomerRepository } from "@src/modules/customer/model/repository/retrieve-all.repository.js";
import { RetrieveAllItemRepository } from "@src/modules/item/model/repository/retrieve-all.repository.js";
import { RetrieveAllItemCategoryRepository } from "@src/modules/item-category/model/repository/retrieve-all.repository.js";
import { RetrieveAllPosRepository } from "@src/modules/pos/model/repository/retrieve-all.repository.js";
import { RetrieveAllStockCorrectionRepository } from "@src/modules/stock-correction/model/repository/retrieve-all.repository.js";
import { RetrieveAllSupplierRepository } from "@src/modules/supplier/model/repository/retrieve-all.repository.js";
import { RetrieveAllTransferItemRepository } from "@src/modules/transfer-item/model/repository/retrieve-all.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";
import { RetrieveAllWarehouseRepository } from "@src/modules/warehouse/model/repository/retrieve-all.repository.js";

export class DeleteCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      /**
       * Request should come from authenticated coa
       */
      const customerData = await new RetrieveAllCustomerRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (customerData.data.length > 0) {
        throw new ApiError(400);
      }

      const supplierData = await new RetrieveAllSupplierRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (supplierData.data.length > 0) {
        throw new ApiError(400);
      }

      const coaData = await new RetrieveAllCoaRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (coaData.data.length > 0) {
        throw new ApiError(400);
      }

      const warehouseData = await new RetrieveAllWarehouseRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (warehouseData.data.length > 0) {
        throw new ApiError(400);
      }

      const itemData = await new RetrieveAllItemRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (itemData.data.length > 0) {
        throw new ApiError(400);
      }

      const itemCategoryData = await new RetrieveAllItemCategoryRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (itemCategoryData.data.length > 0) {
        throw new ApiError(400);
      }

      const transferItemData = await new RetrieveAllTransferItemRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (transferItemData.data.length > 0) {
        throw new ApiError(400);
      }

      const stockCorrectionData = await new RetrieveAllStockCorrectionRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (stockCorrectionData.data.length > 0) {
        throw new ApiError(400);
      }

      const posData = await new RetrieveAllPosRepository(this.db).handle({
        fields: "",
        filter: {
          createdBy_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);
      if (posData.data.length > 0) {
        throw new ApiError(400);
      }

      const response = await new DeleteCoaRepository(this.db).handle(id, options);

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}

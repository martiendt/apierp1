import { objClean } from "@point-hub/express-utils";
import { RetrieveTransferItemRepository } from "../model/repository/retrieve.repository.js";
import { UpdateTransferItemRepository } from "../model/repository/update.repository.js";
import { TransferItemEntity } from "../model/transfer-item.entity.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class ReceiveTransferItemUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(_id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      const receivedAt = new Date();

      const check = await new RetrieveTransferItemRepository(this.db).handle(_id);

      if (check.receivedAt) {
        throw new Error();
      }

      // save to database
      const transferItemEntity = objClean(
        new TransferItemEntity({
          items: document.items,
          receivedAt: receivedAt,
          receivedBy_id: authUser._id,
        })
      );
      const response = await new UpdateTransferItemRepository(this.db).handle(_id, transferItemEntity, {
        session: options.session,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of document.items) {
        if (el.quantityReceived != 0) {
          // save to database
          const inventoryEntity = objClean(
            new InventoryEntity({
              warehouse_id: document.warehouseDestination._id,
              reference: "transfer item",
              reference_id: _id,
              item_id: el._id,
              color: el.color,
              size: el.size,
              quantity: el.quantityReceived,
              createdAt: receivedAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntity, { session: options.session });
        }
      }
      return {
        acknowledged: response.acknowledged,
      };
    } catch (error) {
      throw error;
    }
  }
}

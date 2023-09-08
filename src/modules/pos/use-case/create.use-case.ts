import { objClean } from "@point-hub/express-utils";
import { PosEntity } from "../model/pos.entity.js";
import { CreatePosRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { FinanceEntity } from "@src/modules/finance/model/finance.entity.js";
import { CreateFinanceRepository } from "@src/modules/finance/model/repository/create.repository.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreatePosUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      const createdAt = new Date();

      // save to database
      const posEntity = objClean(
        new PosEntity({
          date: document.date,
          warehouse_id: document.warehouse_id,
          customer_id: document.customer_id,
          items: document.items,
          totalQuantity: document.totalQuantity,
          subtotal: document.subtotal,
          discount: document.discount,
          totalPrice: document.totalPrice,
          paymentType: document.paymentType,
          createdAt: createdAt,
          createdBy_id: authUser._id,
        })
      );
      const response = await new CreatePosRepository(this.db).handle(posEntity, { session: options.session });

      // save to database
      const financeEntity = objClean(
        new FinanceEntity({
          date: document.date,
          description: `pos`,
          value: document.totalPrice,
          reference: "pos",
          reference_id: response._id,
          createdAt: createdAt,
        })
      );
      await new CreateFinanceRepository(this.db).handle(financeEntity, { session: options.session });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of document.items) {
        if (el.quantity) {
          // save to database
          const inventoryEntity = objClean(
            new InventoryEntity({
              warehouse_id: document.warehouse_id,
              reference: "pos",
              reference_id: response._id,
              item_id: el._id,
              size: el.size,
              color: el.color,
              quantity: el.quantity * -1,
              createdAt: createdAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntity, { session: options.session });
        }
      }
      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}

import { objClean } from "@point-hub/express-utils";
import { ObjectId } from "mongodb";
import { AggregateTransferItemRepository } from "../model/repository/aggregate.repository.js";
import { DeleteTransferItemRepository } from "../model/repository/delete.repository.js";
import DatabaseConnection, { DeleteOptionsInterface, QueryInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class DeleteTransferItemUseCase {
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

      const createdAt = new Date();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "warehouseOrigin_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "warehouseOrigin",
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "warehouseDestination_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "warehouseDestination",
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "item_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "item",
          },
        },
        {
          $set: {
            warehouseOrigin: {
              $arrayElemAt: ["$warehouseOrigin", 0],
            },
            warehouseDestination: {
              $arrayElemAt: ["$warehouseDestination", 0],
            },
            item: {
              $arrayElemAt: ["$item", 0],
            },
          },
        },
        { $unset: ["warehouseOrigin_id", "warehouseDestination_id", "item_id"] },
      ];

      const responseTransferItem = await new AggregateTransferItemRepository(this.db).handle(
        pipeline,
        {
          fields: "",
          filter: {},
          page: 1,
          pageSize: 1,
          sort: "",
        } as QueryInterface,
        options
      );

      const transferItem = responseTransferItem.data[0];

      const response = await new DeleteTransferItemRepository(this.db).handle(id, options);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of transferItem.size) {
        if (el.quantity) {
          // save to database
          const inventoryEntity = objClean(
            new InventoryEntity({
              warehouse_id: transferItem.warehouseOrigin._id,
              reference: "transfer item",
              reference_id: transferItem._id,
              item_id: transferItem.item._id,
              size: el.label,
              quantity: el.quantity,
              createdAt: createdAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntity, { session: options.session });

          // save to database
          const inventoryEntityDestination = objClean(
            new InventoryEntity({
              warehouse_id: transferItem.warehouseDestination._id,
              reference: "transfer item",
              reference_id: transferItem._id,
              item_id: transferItem.item._id,
              size: el.label,
              quantity: el.quantity * -1,
              createdAt: createdAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntityDestination, { session: options.session });
        }
      }

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}

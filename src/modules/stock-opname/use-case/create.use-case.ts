import { objClean } from "@point-hub/express-utils";
import e from "express";
import { ObjectId } from "mongodb";
import { CreateStockOpnameRepository } from "../model/repository/create.repository.js";
import { StockOpnameEntity } from "../model/stock-opname.entity.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { AggregateInventoryRepository } from "@src/modules/inventory/model/repository/aggregate.repository.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreateStockOpnameUseCase {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stockOpnameEntity: any = objClean(
        new StockOpnameEntity({
          date: document.date,
          warehouse_id: document.warehouse_id,
          items: document.items,
          createdAt: createdAt,
          createdBy_id: authUser._id,
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let pipeline: any[] = [];
      pipeline.push({ $match: { warehouse_id: new ObjectId(document.warehouse_id) } });
      pipeline = pipeline.concat([
        {
          $lookup: {
            from: "warehouses",
            localField: "warehouse_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "warehouse",
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "item_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1, sellingPrice: 1, color: 1, size: 1, barcode: 1 } }],
            as: "item",
          },
        },
        {
          $set: {
            warehouse: {
              $arrayElemAt: ["$warehouse", 0],
            },
          },
        },
        {
          $set: {
            item: {
              $arrayElemAt: ["$item", 0],
            },
          },
        },
        { $unset: ["warehouse_id", "item_id"] },
        {
          $group: {
            _id: {
              warehouse: "$warehouse",
              item: "$item",
              size: "$size",
              barcode: "$barcode",
              color: "$color",
            },
            quantity: { $sum: "$quantity" },
          },
        },
        {
          $project: {
            _id: 0,
            warehouse: "$_id.warehouse",
            item: "$_id.item",
            size: "$_id.size",
            barcode: "$_id.barcode",
            color: "$_id.color",
            quantity: 1,
          },
        },
      ]);

      pipeline.push({ $match: { quantity: { $gt: 0 } } });

      const inventories = await new AggregateInventoryRepository(this.db).handle(
        pipeline,
        { page: 1, pageSize: 99999 },
        options
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of document.items) {
        el.quantityOrigin = 0;
        for (const inventory of inventories.data) {
          if (el._id === inventory.item._id) {
            el.quantityOrigin = inventory.quantity;
            break;
          }
        }
        el.quantityDiff = el.quantity - el.quantityOrigin;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const inventory of inventories.data) {
        let count = 0;
        for (const el of document.items) {
          if (el._id === inventory.item._id) {
            count = 1;
            break;
          }
        }
        if (count === 0) {
          document.items.push({
            _id: inventory.item._id,
            name: inventory.item.name,
            size: inventory.item.size,
            color: inventory.item.color,
            quantityOrigin: inventory.quantity,
            quantityDiff: 0 - inventory.quantity,
            quantity: 0,
            price: 0,
            total: 0,
          });
        }
      }

      stockOpnameEntity.items = document.items;
      const response = await new CreateStockOpnameRepository(this.db).handle(stockOpnameEntity, {
        session: options.session,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of document.items) {
        // save to database
        const inventoryEntity = objClean(
          new InventoryEntity({
            warehouse_id: document.warehouse_id,
            reference: "stock opname",
            reference_id: response._id,
            item_id: el._id,
            color: el.color,
            size: el.size,
            quantity: el.quantityDiff,
            createdAt: createdAt,
          })
        );
        await new CreateInventoryRepository(this.db).handle(inventoryEntity, { session: options.session });
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

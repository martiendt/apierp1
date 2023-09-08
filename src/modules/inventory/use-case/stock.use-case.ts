import { ObjectId } from "mongodb";
import { AggregateInventoryRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class StockInventoryUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options: RetrieveAllOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

      const filter = query.filter;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let pipeline: any[] = [];
      if (filter.warehouse_id) {
        pipeline.push({ $match: { warehouse_id: new ObjectId(filter.warehouse_id) } });
      }
      if (filter.item_id) {
        pipeline.push({ $match: { item_id: new ObjectId(filter.item_id) } });
      }
      if (filter.size) {
        pipeline.push({ $match: { size: filter.size } });
      }
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

      if (query && query.fields) {
        pipeline.push({ $project: fields(query.fields) });
      }

      if (query && query.sort) {
        pipeline.push({ $sort: { "item.name": 1 } });
      }

      pipeline.push({ $match: { quantity: { $gt: 0 } } });

      const response = await new AggregateInventoryRepository(this.db).handle(pipeline, query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

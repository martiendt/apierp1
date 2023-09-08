import { AggregateTransferItemRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllTransferItemUseCase {
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
      query.filter = {
        $or: [{ "items.name": { $regex: filter.item?.name ?? "", $options: "i" } }],
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
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
          $set: {
            warehouseOrigin: {
              $arrayElemAt: ["$warehouseOrigin", 0],
            },
            warehouseDestination: {
              $arrayElemAt: ["$warehouseDestination", 0],
            },
          },
        },
        { $unset: ["warehouseOrigin_id", "warehouseDestination_id"] },
      ];

      if (query && query.fields) {
        pipeline.push({ $project: fields(query.fields) });
      }

      if (query && query.sort) {
        pipeline.push({ $sort: { createdAt: -1 } });
      }

      if (query && query.filter) {
        pipeline.push({ $match: { ...query.filter } });
      }

      const response = await new AggregateTransferItemRepository(this.db).handle(pipeline, query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

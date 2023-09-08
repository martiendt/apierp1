import { ObjectId } from "mongodb";
import { AggregatePosRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllPosUseCase {
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
      const filters = [];
      if (filter.name) {
        filters.push({ name: { $regex: filter.name ?? "", $options: "i" } });
      }
      if (filter.dateFrom) {
        filters.push({ date: { $gte: filter.dateFrom } });
      }
      if (filter.dateTo) {
        filters.push({ date: { $lte: filter.dateTo } });
      }
      if (filter.warehouse_id) {
        filters.push({ warehouse_id: new ObjectId(filter.warehouse_id) });
      }

      if (filters.length > 1) {
        query.filter = {
          $and: filters,
        };
      } else {
        query.filter = {};
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
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
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "customer",
          },
        },
        {
          $set: {
            warehouse: {
              $arrayElemAt: ["$warehouse", 0],
            },
            customer: {
              $arrayElemAt: ["$customer", 0],
            },
          },
        },
        { $unset: ["customer_id"] },
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

      const response = await new AggregatePosRepository(this.db).handle(pipeline, query, options);
      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

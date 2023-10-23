import { AggregateWarehouseRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";

export class RetrieveAllWarehouseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options: RetrieveAllOptionsInterface) {
    try {
      const filter = query.filter;
      const filterArray = [];
      filterArray.push({ code: { $regex: filter.code ?? "", $options: "i" } });
      filterArray.push({ name: { $regex: filter.name ?? "", $options: "i" } });
      filterArray.push({ "branch.name": { $regex: filter.name ?? "", $options: "i" } });
      query.filter = {
        $or: filterArray,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
        {
          $lookup: {
            from: "branches",
            localField: "branch_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "branch",
          },
        },
        {
          $set: {
            branch: {
              $arrayElemAt: ["$branch", 0],
            },
          },
        },
        { $unset: ["branch_id"] },
      ];

      if (query && query.fields) {
        pipeline.push({ $project: fields(query.fields) });
      }

      if (query && query.sort) {
        pipeline.push({ $sort: { name: 1 } });
      }

      if (query && query.filter) {
        pipeline.push({ $match: { ...query.filter } });
      }

      const response = await new AggregateWarehouseRepository(this.db).handle(pipeline, query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

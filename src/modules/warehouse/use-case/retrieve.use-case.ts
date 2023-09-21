import { ObjectId } from "mongodb";
import { AggregateWarehouseRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";

interface ResponseInterface {
  _id: string;
  name?: string;
  code?: string;
  branch: {
    _id: string;
    name: string;
  };
  createdAt?: Date;
}

export class RetrieveWarehouseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
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

      const response = await new AggregateWarehouseRepository(this.db).handle(
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

      return {
        _id: response.data[0]._id,
        code: response.data[0].code,
        name: response.data[0].name,
        branch: response.data[0].branch,
        createdAt: response.data[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

import { ObjectId } from "mongodb";
import { AggregateStockCorrectionRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export interface ResponseInterface {
  _id: string;
  date?: string;
  warehouse?: { name?: string };
  items?: { name?: string }[];
  createdAt?: Date;
}

export class RetrieveStockCorrectionUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

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
            localField: "warehouse_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "warehouse",
          },
        },
        {
          $set: {
            warehouse: {
              $arrayElemAt: ["$warehouse", 0],
            },
          },
        },
        { $unset: ["warehouse_id"] },
      ];

      const response = await new AggregateStockCorrectionRepository(this.db).handle(
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
        date: response.data[0].date,
        warehouse: response.data[0].warehouse,
        items: response.data[0].items,
        createdAt: response.data[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

import { ObjectId } from "mongodb";
import { AggregateTransferItemRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export interface ResponseInterface {
  _id: string;
  date?: string;
  warehouseOrigin?: { name?: string };
  warehouseDestination?: { name?: string };
  items?: { name?: string }[];
  createdAt?: Date;
  receivedAt?: Date;
}

export class RetrieveTransferItemUseCase {
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

      const response = await new AggregateTransferItemRepository(this.db).handle(
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
        warehouseOrigin: response.data[0].warehouseOrigin,
        warehouseDestination: response.data[0].warehouseDestination,
        items: response.data[0].items,
        createdAt: response.data[0].createdAt,
        receivedAt: response.data[0].receivedAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

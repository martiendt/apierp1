import { ObjectId } from "mongodb";
import { AggregatePosRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export interface ResponseInterface {
  _id: string;
  date?: string;
  warehouse?: { name?: string };
  customer?: { name?: string };
  items?: { _id: string; name?: string; size?: string; quantity: number; price?: number; total?: number };
  totalQuantity?: number;
  subtotal?: number;
  discount?: number;
  totalPrice?: number;
  paymentType?: string;
  createdBy_id?: string;
  createdAt?: Date;
  createdBy?: { _id: string; name: string };
}

export class RetrievePosUseCase {
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
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "createdBy",
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
            warehouse: {
              $arrayElemAt: ["$warehouse", 0],
            },
            customer: {
              $arrayElemAt: ["$customer", 0],
            },
            createdBy: {
              $arrayElemAt: ["$createdBy", 0],
            },
          },
        },
        { $unset: ["warehouse_id", "customer_id", "createdBy_id"] },
      ];

      const response = await new AggregatePosRepository(this.db).handle(
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
        customer: response.data[0].customer,
        items: response.data[0].items,
        totalQuantity: response.data[0].totalQuantity,
        subtotal: response.data[0].totalPrice,
        discount: response.data[0].discount ?? 0,
        totalPrice: response.data[0].totalPrice - response.data[0].discount ?? 0,
        paymentType: response.data[0].paymentType,
        createdAt: response.data[0].createdAt,
        createdBy: response.data[0].createdBy,
      };
    } catch (error) {
      throw error;
    }
  }
}

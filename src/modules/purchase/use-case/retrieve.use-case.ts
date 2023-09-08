import { ObjectId } from "mongodb";
import { sizeTypes } from "../model/purchase.entity.js";
import { AggregatePurchaseRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export interface ResponseInterface {
  _id: string;
  date?: string;
  warehouse?: { name?: string };
  supplier?: { name?: string };
  item?: { name?: string };
  itemCategory?: { name?: string };
  code?: string;
  name?: string;
  size?: string;
  color?: string;
  barcode?: string;
  photoUrl?: string;
  totalQuantity?: number;
  price?: number;
  cargoPrice?: number;
  totalPrice?: number;
  profitMargin?: number;
  totalProfit?: number;
  totalSelling?: number;
  sellingPrice?: number;
  createdAt?: Date;
}

export class RetrievePurchaseUseCase {
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
            from: "suppliers",
            localField: "supplier_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "supplier",
          },
        },
        {
          $lookup: {
            from: "itemCategories",
            localField: "itemCategory_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "itemCategory",
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
          },
        },
        {
          $set: {
            supplier: {
              $arrayElemAt: ["$supplier", 0],
            },
          },
        },
        {
          $set: {
            itemCategory: {
              $arrayElemAt: ["$itemCategory", 0],
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
        { $unset: ["warehouse_id", "supplier_id", "itemCategory_id", "item_id"] },
      ];

      const response = await new AggregatePurchaseRepository(this.db).handle(
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
        supplier: response.data[0].supplier,
        item: response.data[0].item,
        itemCategory: response.data[0].itemCategory,
        code: response.data[0].code,
        name: response.data[0].name,
        size: response.data[0].size,
        color: response.data[0].color,
        barcode: response.data[0].barcode,
        photoUrl: response.data[0].photoUrl,
        totalQuantity: response.data[0].totalQuantity,
        price: response.data[0].price,
        cargoPrice: response.data[0].cargoPrice,
        totalPrice: response.data[0].totalPrice,
        profitMargin: response.data[0].profitMargin,
        totalProfit: response.data[0].totalProfit,
        totalSelling: response.data[0].totalSelling,
        sellingPrice: response.data[0].sellingPrice,
        createdAt: response.data[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

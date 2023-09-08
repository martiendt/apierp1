import { NextFunction, Request, Response } from "express";
import { RetrievePurchaseUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPurchaseUseCase = new RetrievePurchaseUseCase(db);
    const result = await createPurchaseUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      date: result.date,
      warehouse: result.warehouse,
      supplier: result.supplier,
      item: result.item,
      itemCategory: result.itemCategory,
      code: result.code,
      name: result.name,
      size: result.size,
      color: result.color,
      barcode: result.barcode,
      photoUrl: result.photoUrl,
      totalQuantity: result.totalQuantity,
      price: result.price,
      cargoPrice: result.cargoPrice,
      totalPrice: result.totalPrice,
      profitMargin: result.profitMargin,
      totalProfit: result.totalProfit,
      totalSelling: result.totalSelling,
      sellingPrice: result.sellingPrice,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

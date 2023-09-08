import { NextFunction, Request, Response } from "express";
import { RetrieveItemUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createItemUseCase = new RetrieveItemUseCase(db);
    const result = await createItemUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      barcode: result.barcode,
      name: result.name,
      color: result.color,
      size: result.size,
      sellingPrice: result.sellingPrice,
      itemCategory: result.itemCategory,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

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
      code: result.code,
      name: result.name,
      unit: result.unit,
      notes: result.notes,
      item_category_id: result.item_category_id,
      coa_id: result.coa_id,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

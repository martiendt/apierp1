import { NextFunction, Request, Response } from "express";
import { RetrieveTransferItemUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createTransferItemUseCase = new RetrieveTransferItemUseCase(db);
    const result = await createTransferItemUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      date: result.date,
      warehouseOrigin: result.warehouseOrigin,
      warehouseDestination: result.warehouseDestination,
      items: result.items,
      createdAt: result.createdAt,
      receivedAt: result.receivedAt,
    });
  } catch (error) {
    next(error);
  }
};

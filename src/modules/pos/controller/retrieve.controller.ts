import { NextFunction, Request, Response } from "express";
import { RetrievePosUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createPosUseCase = new RetrievePosUseCase(db);
    const result = await createPosUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      date: result.date,
      warehouse: result.warehouse,
      customer: result.customer,
      items: result.items,
      totalQuantity: result.totalQuantity,
      subtotal: result.subtotal,
      discount: result.discount,
      totalPrice: result.totalPrice,
      paymentType: result.paymentType,
      createdAt: result.createdAt,
      createdBy: result.createdBy,
    });
  } catch (error) {
    next(error);
  }
};

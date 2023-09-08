import { NextFunction, Request, Response } from "express";
import { ReceiveTransferItemUseCase } from "../use-case/receive.use-case.js";
import { db } from "@src/database/database.js";

export const receiveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const receiveTransferItemUseCase = new ReceiveTransferItemUseCase(db);
    await receiveTransferItemUseCase.handle(req.params.id, req.body, {
      session,
      authorizationHeader: req.headers.authorization ?? "",
    });

    await db.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};

import { NextFunction, Request, Response } from "express";
import { DeleteItemUseCase } from "../use-case/delete.use-case.js";
import { db } from "@src/database/database.js";

export const deleteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const deleteItemUseCase = new DeleteItemUseCase(db);
    await deleteItemUseCase.handle(req.params.id, { session, authorizationHeader: req.headers.authorization ?? "" });

    await db.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};

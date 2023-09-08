import { NextFunction, Request, Response } from "express";
import { RetrieveBranchExpenseUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createBranchExpenseUseCase = new RetrieveBranchExpenseUseCase(db);
    const result = await createBranchExpenseUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      date: result.date,
      warehouse: result.warehouse,
      items: result.items,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

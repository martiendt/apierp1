import { NextFunction, Request, Response } from "express";
import { RetrieveSettingJournalUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createSettingJournalUseCase = new RetrieveSettingJournalUseCase(db);
    const result = await createSettingJournalUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });
    console.log(result);
    res.status(200).json({
      _id: result._id,
      name: result.name,
      number: result.number,
      type: result.type,
      category: result.category,
      increasing_in: result.increasing_in,
      subledger: result.subledger,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

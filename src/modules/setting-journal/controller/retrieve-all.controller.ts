import { NextFunction, Request, Response } from "express";
import { RetrieveAllSettingJournalUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: QueryInterface = {
      fields: (req.query.fields as string) ?? "",
      filter: (req.query.filter as object) ?? {},
      page: Number(req.query.page ?? 1),
      pageSize: Number(req.query.pageSize ?? 10),
      sort: (req.query.sort as string) ?? "",
    };

    const retrieveAllSettingJournalUseCase = new RetrieveAllSettingJournalUseCase(db);
    const result = await retrieveAllSettingJournalUseCase.handle(query, {
      authorizationHeader: req.headers.authorization ?? "",
    });
    res.status(200).json({
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

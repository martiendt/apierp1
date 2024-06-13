import { NextFunction, Request, Response } from "express";
import { RetrieveAllAllocationUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: QueryInterface = {
      fields: (req.query.fields as string) ?? "",
      filter: (req.query.filter as object) ?? {},
      page: Number(req.query.page ?? 1),
      pageSize: Number(100),
      sort: (req.query.sort as string) ?? "",
    };

    const createAllocationUseCase = new RetrieveAllAllocationUseCase(db);
    const result = await createAllocationUseCase.handle(query as unknown as QueryInterface, {
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

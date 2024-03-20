import { NextFunction, Request, Response } from "express";
import { RetrieveAllocationGroupUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createAllocationGroupUseCase = new RetrieveAllocationGroupUseCase(db);
    const result = await createAllocationGroupUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      name: result.name,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

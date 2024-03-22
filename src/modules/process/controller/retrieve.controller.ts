import { NextFunction, Request, Response } from "express";
import { RetrieveMachineUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createMachineUseCase = new RetrieveMachineUseCase(db);
    const result = await createMachineUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      code: result.code,
      name: result.name,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { RetrieveExpeditionUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createExpeditionUseCase = new RetrieveExpeditionUseCase(db);
    const result = await createExpeditionUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      code: result.code,
      name: result.name,
      address: result.address,
      phone: result.phone,
      email: result.email,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

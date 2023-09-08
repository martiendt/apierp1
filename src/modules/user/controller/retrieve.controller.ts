import { NextFunction, Request, Response } from "express";
import { RetrieveUserUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createUserUseCase = new RetrieveUserUseCase(db);
    const result = await createUserUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
      name: result.name,
      username: result.username,
      role: result.role,
      warehouse: result.warehouse,
      status: result.status,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

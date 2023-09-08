import { NextFunction, Request, Response } from "express";
import { RetrieveCustomerUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCustomerUseCase = new RetrieveCustomerUseCase(db);
    const result = await createCustomerUseCase.handle(req.params.id, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    res.status(200).json({
      _id: result._id,
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

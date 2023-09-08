import { NextFunction, Request, Response } from "express";
import { RetrieveSupplierUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createSupplierUseCase = new RetrieveSupplierUseCase(db);
    const result = await createSupplierUseCase.handle(req.params.id, {
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

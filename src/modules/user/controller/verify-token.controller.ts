import { NextFunction, Request, Response } from "express";
import { VerifyTokenUseCase } from "../use-case/verify-token.use-case.js";
import { db } from "@src/database/database.js";

interface ResponseInterface {
  _id: string;
  name: string;
  username: string;
  role: string;
  warehouse_id: string;
}

export const verifyTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const session = db.startSession();

    db.startTransaction();

    const authorizationHeader = req.headers.authorization ?? "";

    const verifyTokenUseCase = new VerifyTokenUseCase(db);
    const result = await verifyTokenUseCase.handle(authorizationHeader);

    await db.commitTransaction();

    const response: ResponseInterface = {
      _id: result._id,
      name: result.name,
      username: result.username,
      role: result.role,
      warehouse_id: result.warehouse_id,
    };

    res.status(200).json(response);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};

import { NextFunction, Request, Response } from "express";
import { SigninUseCase } from "../use-case/signin.use-case.js";
import { db } from "@src/database/database.js";

interface ResponseInterface {
  _id: string;
  name: string;
  username: string;
  role: string;
  warehouse_id: string;
  accessToken: string;
  refreshToken: string;
}

export const signinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const session = db.startSession();

    db.startTransaction();

    const signinUseCase = new SigninUseCase(db);
    const result = await signinUseCase.handle(req.body.username, req.body.password);

    await db.commitTransaction();

    const response: ResponseInterface = {
      _id: result._id,
      name: result.name,
      username: result.username,
      role: result.role,
      warehouse_id: result.warehouse_id,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };

    res.status(200).json(response);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};

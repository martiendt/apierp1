import { NextFunction, Request, Response } from "express";
import { VerifyPasswordUseCase } from "../use-case/verify-password.use-case.js";
import { db } from "@src/database/database.js";

interface ResponseInterface {
  _id: string;
  name: string;
  username: string;
  role: string;
  warehouse_id: string;
}

export const verifyPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const session = db.startSession();
    console.log("check pass");
    db.startTransaction();

    const verifyPasswordUseCase = new VerifyPasswordUseCase(db);
    await verifyPasswordUseCase.handle(req.body.password, {
      authorizationHeader: req.headers.authorization ?? "",
    });

    await db.commitTransaction();
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};

import { NextFunction, Request, Response } from "express";
import { UploadPurchaseUseCase } from "../use-case/upload.use-case.js";
import { db } from "@src/database/database.js";

interface ResponseInterface {
  _id: any;
}

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();
    const files = req.files as Express.Multer.File[];

    db.startTransaction();

    const uploadPurchaseUseCase = new UploadPurchaseUseCase(db);
    const result = await uploadPurchaseUseCase.handle(req.body, files, {
      session,
      authorizationHeader: req.headers.authorization ?? "",
    });

    await db.commitTransaction();

    const responseValue: ResponseInterface = {
      _id: result,
    };

    res.status(201).json(responseValue);
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};

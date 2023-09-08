import { objClean } from "@point-hub/express-utils";
import { BranchExpenseEntity } from "../model/branch-expense.entity.js";
import { CreateBranchExpenseRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { FinanceEntity } from "@src/modules/finance/model/finance.entity.js";
import { CreateFinanceRepository } from "@src/modules/finance/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreateBranchExpenseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      const createdAt = new Date();

      // save to database
      const stockCorrectionEntity = objClean(
        new BranchExpenseEntity({
          date: document.date,
          warehouse_id: document.warehouse_id,
          items: document.items,
          createdAt: createdAt,
          createdBy_id: authUser._id,
        })
      );
      const response = await new CreateBranchExpenseRepository(this.db).handle(stockCorrectionEntity, {
        session: options.session,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of document.items) {
        // save to database
        const financeEntity = objClean(
          new FinanceEntity({
            date: document.date,
            description: `expense - ${el.description}`,
            value: el.value * -1,
            reference: "branch-expense",
            reference_id: response._id,
            createdAt: createdAt,
          })
        );
        await new CreateFinanceRepository(this.db).handle(financeEntity, { session: options.session });
      }
      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}

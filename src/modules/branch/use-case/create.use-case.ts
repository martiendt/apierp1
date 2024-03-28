import { objClean } from "@point-hub/express-utils";
import { BranchEntity } from "../model/branch.entity.js";
import { CreateBranchRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreateBranchUseCase {
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

      // save to database
      const branchEntity = objClean(
        new BranchEntity({
          code: document.code,
          name: document.name,
          address: document.address,
          phone: document.phone,
          createdAt: new Date(),
          createdBy_id: authUser._id,
        })
      );

      const response = await new CreateBranchRepository(this.db).handle(branchEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}

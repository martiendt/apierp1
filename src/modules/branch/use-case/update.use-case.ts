import { objClean } from "@point-hub/express-utils";
import { BranchEntity } from "../model/branch.entity.js";
import { UpdateBranchRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateBranchUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      // update database
      const branchEntity = new BranchEntity({
        code: document.code,
        name: document.name,
        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const branchRepository = new UpdateBranchRepository(this.db);
      await branchRepository.handle(id, objClean(branchEntity), {
        session: options.session,
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

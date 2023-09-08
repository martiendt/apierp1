import { objClean } from "@point-hub/express-utils";
import { UpdateUserRepository } from "../model/repository/update.repository.js";
import { UserEntity } from "../model/user.entity.js";
import { validate } from "../validation/update.validation.js";
import { VerifyTokenUseCase } from "./verify-token.use-case.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateUserUseCase {
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
      const userEntity = new UserEntity({
        role: document.role,
        warehouse_id: document.warehouse_id,
        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const userRepository = new UpdateUserRepository(this.db);
      await userRepository.handle(id, objClean(userEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}

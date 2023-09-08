import { objClean } from "@point-hub/express-utils";
import { CreateUserRepository } from "../model/repository/create.repository.js";
import { UserEntity, UserStatusTypes } from "../model/user.entity.js";
import { validate } from "../validation/create.validation.js";
import { VerifyTokenUseCase } from "./verify-token.use-case.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { hash } from "@src/utils/hash.js";

export class CreateUserUseCase {
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
      const userEntity = objClean(
        new UserEntity({
          name: document.name,
          username: document.username,
          password: await hash(document.password),
          role: document.role,
          warehouse_id: document.warehouse_id,
          status: UserStatusTypes.Active,
          createdAt: new Date(),
          createdBy_id: authUser._id,
        })
      );

      const response = await new CreateUserRepository(this.db).handle(userEntity, {
        session: options.session,
      });

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}

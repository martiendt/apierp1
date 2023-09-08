import { objClean } from "@point-hub/express-utils";
import { ItemCategoryEntity } from "../model/item-category.entity.js";
import { UpdateItemCategoryRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateItemCategoryUseCase {
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
      const itemCategoryEntity = new ItemCategoryEntity({
        name: document.name,
        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const itemCategoryRepository = new UpdateItemCategoryRepository(this.db);
      await itemCategoryRepository.handle(id, objClean(itemCategoryEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}

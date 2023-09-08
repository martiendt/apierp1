import { objClean } from "@point-hub/express-utils";
import { ItemEntity } from "../model/item.entity.js";
import { UpdateItemRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateItemUseCase {
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
      const itemEntity = new ItemEntity({
        name: document.name,
        itemCategory_id: document.itemCategory_id,
        sellingPrice: document.sellingPrice,
        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const itemRepository = new UpdateItemRepository(this.db);
      await itemRepository.handle(id, objClean(itemEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}

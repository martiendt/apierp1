import { objClean } from "@point-hub/express-utils";
import { ExpeditionEntity } from "../model/expedition.entity.js";
import { UpdateExpeditionRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateExpeditionUseCase {
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
      const expeditionEntity = new ExpeditionEntity({
        code: document.code,
        name: document.name,
        address: document.address,
        phone: document.phone,
        email: document.email,
        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const expeditionRepository = new UpdateExpeditionRepository(this.db);
      await expeditionRepository.handle(id, objClean(expeditionEntity), {
        session: options.session,
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

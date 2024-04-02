import { objClean, trim } from "@point-hub/express-utils";
import { CoaEntity } from "../model/coa.entity.js";
import { UpdateCoaRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated coa
       */
      const verifyTokenCoaService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authCoa = (await verifyTokenCoaService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      // update database
      const coaEntity = new CoaEntity({
        type: document.type,
        category: document.category,
        number: trim(document.number),
        name: trim(document.name),
        increasing_in: document.increasing_in,
        subledger: document.subledger,
        updatedAt: new Date(),
        updatedBy_id: authCoa._id,
      });

      const coaRepository = new UpdateCoaRepository(this.db);
      await coaRepository.handle(id, objClean(coaEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}

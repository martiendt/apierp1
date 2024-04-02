import { objClean } from "@point-hub/express-utils";
import { CoaEntity } from "../model/coa.entity.js";
import { CreateCoaRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreateCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated coa
       */
      const verifyTokenCoaService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authCoa = (await verifyTokenCoaService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      // save to database
      const coaEntity = objClean(
        new CoaEntity({
          type: document.type,
          category: document.category,
          name: document.name,
          number: document.number,
          increasing_in: document.increasing_in,
          subledger: document.subledger,
          createdAt: new Date(),
          createdBy_id: authCoa._id,
        })
      );

      const response = await new CreateCoaRepository(this.db).handle(coaEntity, {
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

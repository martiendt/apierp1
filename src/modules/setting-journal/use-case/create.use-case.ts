import { objClean, trim } from "@point-hub/express-utils";
import { SettingJournalEntity } from "../model/setting-journal.entity.js";
import { CreateSettingJournalRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreateSettingJournalUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated settingJournal
       */
      const verifyTokenSettingJournalService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authSettingJournal = (await verifyTokenSettingJournalService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      // save to database
      const settingJournalEntity = objClean(
        new SettingJournalEntity({
          type: document.type,
          category: document.category,
          name: trim(document.name),
          number: trim(document.number),
          increasing_in: document.increasing_in,
          subledger: document.subledger,
          createdAt: new Date(),
          createdBy_id: authSettingJournal._id,
        })
      );

      const response = await new CreateSettingJournalRepository(this.db).handle(settingJournalEntity, {
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

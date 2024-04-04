import { objClean } from "@point-hub/express-utils";
import { UpdateSettingJournalRepository } from "../model/repository/update.repository.js";
import { SettingJournalEntity } from "../model/setting-journal.entity.js";
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
      await verifyTokenSettingJournalService.handle(options.authorizationHeader ?? "");

      // validate request body
      validate(document);

      for (const element of document.coa) {
        const settingJournalEntity = objClean(
          new SettingJournalEntity({
            _id: element._id,
            module: element.module,
            account: element.account,
            coa_id: element.coa_id,
          })
        );
        const id: string = element._id;
        await new UpdateSettingJournalRepository(this.db).handle(id, settingJournalEntity, {
          session: options.session,
        });
      }

      return {};
    } catch (error) {
      throw error;
    }
  }
}

import { objClean, trim } from "@point-hub/express-utils";
import { UpdateSettingJournalRepository } from "../model/repository/update.repository.js";
import { SettingJournalEntity } from "../model/setting-journal.entity.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateSettingJournalUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated settingJournal
       */
      const verifyTokenSettingJournalService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authSettingJournal = (await verifyTokenSettingJournalService.handle(
        options.authorizationHeader ?? ""
      )) as any;

      // validate request body
      validate(document);

      // update database
      const settingJournalEntity = new SettingJournalEntity({
        type: document.type,
        category: document.category,
        number: trim(document.number),
        name: trim(document.name),
        increasing_in: document.increasing_in,
        subledger: document.subledger,
        updatedAt: new Date(),
        updatedBy_id: authSettingJournal._id,
      });

      const settingJournalRepository = new UpdateSettingJournalRepository(this.db);
      await settingJournalRepository.handle(id, objClean(settingJournalEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}

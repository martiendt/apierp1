import { DeleteSettingJournalRepository } from "../model/repository/delete.repository.js";
import DatabaseConnection, { DeleteOptionsInterface, QueryInterface } from "@src/database/connection.js";

export class DeleteSettingJournalUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      console.log("id", id);
      const response = await new DeleteSettingJournalRepository(this.db).handle(id, options);

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}

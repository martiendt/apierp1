import { ObjectId } from "mongodb";
import { AggregateSettingJournalRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

interface ResponseInterface {
  _id: string;
  name?: string;
  number?: string;
  type?: string;
  category?: string;
  increasing_in?: string;
  subledger?: string;
  createdAt?: Date;
}

export class RetrieveSettingJournalUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      /**
       * Request should come from authenticated settingJournal
       */
      const verifyTokenSettingJournalService = new VerifyTokenUseCase(this.db);
      await verifyTokenSettingJournalService.handle(options.authorizationHeader ?? "");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
      ];

      const response = await new AggregateSettingJournalRepository(this.db).handle(
        pipeline,
        {
          fields: "",
          filter: {},
          page: 1,
          pageSize: 1,
          sort: "",
        } as QueryInterface,
        options
      );

      return {
        _id: response.data[0]._id,
        name: response.data[0].name,
        number: response.data[0].number,
        type: response.data[0].type,
        category: response.data[0].category,
        subledger: response.data[0].subledger,
        increasing_in: response.data[0].increasing_in,
        createdAt: response.data[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

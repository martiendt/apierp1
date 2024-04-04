import { AggregateSettingJournalRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllSettingJournalUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options: RetrieveAllOptionsInterface) {
    try {
      /**
       * Request should come from authenticated settingJournal
       */
      const verifyTokenSettingJournalService = new VerifyTokenUseCase(this.db);
      await verifyTokenSettingJournalService.handle(options.authorizationHeader ?? "");

      const filter = query.filter;

      query.filter = {
        $or: [{ module: { $regex: filter.module ?? "", $options: "i" } }],
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [];
      if (filter.group === "true") {
        pipeline.push({ $group: { _id: "$module", module: { $first: "$module" } } });
      }
      if (query && query.fields) {
        pipeline.push({ $project: fields(query.fields) });
      }

      if (query && query.sort) {
        pipeline.push({ $sort: { module: 1 } });
      }

      if (query && query.filter) {
        pipeline.push({ $match: { ...query.filter } });
      }

      const response = await new AggregateSettingJournalRepository(this.db).handle(pipeline, query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

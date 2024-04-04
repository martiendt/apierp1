import { AggregateCoaRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options: RetrieveAllOptionsInterface) {
    try {
      /**
       * Request should come from authenticated coa
       */
      const verifyTokenCoaService = new VerifyTokenUseCase(this.db);
      await verifyTokenCoaService.handle(options.authorizationHeader ?? "");

      const filter = query.filter;
      console.log(filter);
      query.filter = {
        $or: [
          { name: { $regex: filter.name ?? "", $options: "i" } },
          { numberStr: { $regex: filter.name ?? "", $options: "i" } },
          { category: { $regex: filter.name ?? "", $options: "i" } },
          { type: { $regex: filter.name ?? "", $options: "i" } },
          { subledger: { $regex: filter.name ?? "", $options: "i" } },
          { increasing_in: { $regex: filter.name ?? "", $options: "i" } },
        ],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [{ $addFields: { numberStr: { $toString: "$number" } } }];

      if (query && query.fields) {
        pipeline.push({ $project: fields(query.fields) });
      }

      if (query && query.sort) {
        pipeline.push({ $sort: { number: 1 } });
      }

      if (query && query.filter) {
        pipeline.push({ $match: { ...query.filter } });
      }

      const response = await new AggregateCoaRepository(this.db).handle(pipeline, query, options);
      console.log(response.data.length);
      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

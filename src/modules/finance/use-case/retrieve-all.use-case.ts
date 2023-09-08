import { RetrieveAllFinanceRepository } from "../model/repository/retrieve-all.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllFinanceUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options: RetrieveAllOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

      const filter = query.filter;
      const filters = [];
      if (filter.dateFrom) {
        filters.push({ date: { $gte: filter.dateFrom } });
      }
      if (filter.dateTo) {
        filters.push({ date: { $lte: filter.dateTo } });
      }

      if (filters.length > 1) {
        query.filter = {
          $and: filters,
        };
      } else {
        query.filter = {};
      }

      const response = await new RetrieveAllFinanceRepository(this.db).handle(query, options);

      console.log("Test ", response);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

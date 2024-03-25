import { RetrieveAllItemRepository } from "../model/repository/retrieve-all.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllItemUseCase {
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
      const filterArray = [];
      filterArray.push({ code: { $regex: filter.code ?? "", $options: "i" } });
      filterArray.push({ name: { $regex: filter.name ?? "", $options: "i" } });
      if (filter.unit) {
        filterArray.push({ unit: { $regex: filter.unit ?? "", $options: "i" } });
      }
      query.filter = {
        $or: filterArray,
      };
      const response = await new RetrieveAllItemRepository(this.db).handle(query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

import { RetrieveAllSupplierRepository } from "../model/repository/retrieve-all.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllSupplierUseCase {
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
      filterArray.push({ name: { $regex: filter.name ?? "", $options: "i" } });
      if (filter.address) {
        filterArray.push({ address: { $regex: filter.address ?? "", $options: "i" } });
      }
      if (filter.phone) {
        filterArray.push({ phone: { $regex: filter.phone ?? "", $options: "i" } });
      }
      if (filter.email) {
        filterArray.push({ email: { $regex: filter.email ?? "", $options: "i" } });
      }
      if (filter.notes) {
        filterArray.push({ notes: { $regex: filter.notes ?? "", $options: "i" } });
      }
      query.filter = {
        $or: filterArray,
      };
      const response = await new RetrieveAllSupplierRepository(this.db).handle(query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}

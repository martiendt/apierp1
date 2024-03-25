import { RetrieveItemRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export interface ResponseInterface {
  _id: string;
  code?: string;
  name?: string;
  unit?: string;
  notes?: string;
  createdAt?: Date;
}

export class RetrieveItemUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

      const response = await new RetrieveItemRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        code: response.code,
        name: response.name,
        unit: response.unit,
        notes: response.notes,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

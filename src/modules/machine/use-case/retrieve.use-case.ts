import { RetrieveMachineRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

interface ResponseInterface {
  _id: string;
  code?: string;
  name?: string;
  notes?: string;
  createdAt?: Date;
}

export class RetrieveMachineUseCase {
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

      const response = await new RetrieveMachineRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        code: response.code,
        name: response.name,
        notes: response.notes,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

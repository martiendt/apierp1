import { ApiError } from "@point-hub/express-error-handler";
import { RetrieveUserRepository } from "../model/repository/retrieve.repository.js";
import { secretKey } from "@src/config/auth.js";
import DatabaseConnection from "@src/database/connection.js";
import { verifyToken } from "@src/utils/jwt.js";

export class VerifyTokenUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(authorizationHeader: string) {
    try {
      if (!authorizationHeader) {
        throw new ApiError(401);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = verifyToken(authorizationHeader.split(" ")[1], secretKey);

      // token invalid
      if (!result) {
        throw new ApiError(401);
      }

      // token expired
      if (new Date() > result.exp) {
        throw new ApiError(401);
      }

      const response = await new RetrieveUserRepository(this.db).handle(result.sub);

      return {
        _id: response._id,
        name: response.name as string,
        username: response.username as string,
        role: response.role as string,
        warehouse_id: response.warehouse_id as string,
        status: response.status as string,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

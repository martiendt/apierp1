import { ApiError } from "@point-hub/express-error-handler";
import { RetrieveAllUserRepository } from "../model/repository/retrieve-all.repository.js";
import { issuer, secretKey } from "@src/config/auth.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";
import { verify } from "@src/utils/hash.js";
import { generateRefreshToken, signNewToken } from "@src/utils/jwt.js";

export class SigninUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(username: string, password: string) {
    try {
      const query: QueryInterface = {
        fields: "",
        filter: {
          $or: [
            {
              username: {
                $regex: `^${username}$`,
                $options: "i",
              },
            },
          ],
        },
        page: 1,
        pageSize: 1,
        sort: "",
      };

      const result = await new RetrieveAllUserRepository(this.db).handle(query);

      let isVerified = false;
      if (result.pagination.totalDocument === 1) {
        isVerified = await verify(result.data[0].password as string, password);
      }

      if (!isVerified) {
        throw new ApiError(401);
      }

      const accessToken = signNewToken(issuer, secretKey, result.data[0]._id);
      const refreshToken = generateRefreshToken(issuer, secretKey, result.data[0]._id);

      const response = await new RetrieveAllUserRepository(this.db).handle(query);

      return {
        _id: response.data[0]._id,
        name: response.data[0].name as string,
        username: response.data[0].username as string,
        role: response.data[0].role as string,
        warehouse_id: response.data[0].warehouse_id as string,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}

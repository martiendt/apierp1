import { ApiError } from "@point-hub/express-error-handler";
import { verify } from "argon2";
import { RetrieveAllUserRepository } from "../model/repository/retrieve-all.repository.js";
import { VerifyTokenUseCase } from "./verify-token.use-case.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class VerifyPasswordUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async handle(password: string, options: any) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      const query: QueryInterface = {
        fields: "",
        filter: {
          $or: [
            {
              username: {
                $regex: `^${authUser.username}$`,
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
    } catch (error) {
      throw error;
    }
  }
}

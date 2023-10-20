import { RetrieveCustomerRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export interface ResponseInterface {
  _id: string;
  code?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  notes?: string;
  createdAt?: Date;
  bankBranch?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  creditLimit?: number;
}

export class RetrieveCustomerUseCase {
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

      const response = await new RetrieveCustomerRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        code: response.code,
        name: response.name,
        address: response.address,
        phone: response.phone,
        email: response.email,
        notes: response.notes,
        bankBranch: response.bankBranch,
        bankName: response.bankName,
        accountName: response.accountName,
        accountNumber: response.accountNumber,
        creditLimit: response.creditLimit,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}

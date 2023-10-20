import { objClean } from "@point-hub/express-utils";
import { CustomerEntity } from "../model/customer.entity.js";
import { UpdateCustomerRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateCustomerUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      // update database
      const customerEntity = new CustomerEntity({
        code: document.code,
        name: document.name,
        address: document.address,
        phone: document.phone,
        email: document.email,
        bankBranch: document.bankBranch,
        bankName: document.bankName,
        accountNumber: document.accountNumber,
        accountName: document.accountName,
        creditLimit: document.creditLimit,
        notes: document.notes,
        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const customerRepository = new UpdateCustomerRepository(this.db);
      await customerRepository.handle(id, objClean(customerEntity), {
        session: options.session,
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

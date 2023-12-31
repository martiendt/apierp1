import { objClean } from "@point-hub/express-utils";
import { UpdateSupplierRepository } from "../model/repository/update.repository.js";
import { SupplierEntity } from "../model/supplier.entity.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateSupplierUseCase {
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
      const supplierEntity = new SupplierEntity({
        code: document.code,
        name: document.name,
        address: document.address,
        phone: document.phone,
        email: document.email,
        notes: document.notes,
        bankBranch: document.bankBranch,
        bankName: document.bankName,
        accountNumber: document.accountNumber,
        accountName: document.accountName,
        creditLimit: document.creditLimit,

        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const supplierRepository = new UpdateSupplierRepository(this.db);
      await supplierRepository.handle(id, objClean(supplierEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}

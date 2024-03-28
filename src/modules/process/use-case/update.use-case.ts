import { objClean } from "@point-hub/express-utils";
import { MachineEntity } from "../model/process.entity.js";
import { UpdateMachineRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class UpdateMachineUseCase {
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
      const machineEntity = new MachineEntity({
        code: document.code,
        name: document.name,
        notes: document.notes,
        updatedAt: new Date(),
        updatedBy_id: authUser._id,
      });

      const machineRepository = new UpdateMachineRepository(this.db);
      await machineRepository.handle(id, objClean(machineEntity), {
        session: options.session,
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}

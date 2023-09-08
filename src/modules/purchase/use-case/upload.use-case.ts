// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { objClean } from "@point-hub/express-utils";
import { format } from "date-fns";
import { PurchaseEntity } from "../model/purchase.entity.js";
import { CreatePurchaseRepository } from "../model/repository/create.repository.js";
import { UpdatePurchaseRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { ItemEntity } from "@src/modules/item/model/item.entity.js";
import { CreateItemRepository } from "@src/modules/item/model/repository/create.repository.js";
import { UpdateManyItemRepository } from "@src/modules/item/model/repository/update-many.repository.js";
import { UpdateItemRepository } from "@src/modules/item/model/repository/update.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";
import { s3Client } from "@src/utils/s3.js";

export class UploadPurchaseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, files: any[], options: CreateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      // const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      // validate(document);

      // Set the parameters
      const params = {
        Bucket: "point-web",
        Key: `${document.name}-${document.color}.png`,
        Body: files[0].buffer,
      };

      const result = await s3Client.send(new PutObjectCommand(params));

      const photoUrl = `https://f005.backblazeb2.com/file/dorothy-web/${params.Key}`;

      // update database
      const purchaseEntity = new PurchaseEntity({
        photoUrl: photoUrl,
      });
      const purchaseRepo = new UpdatePurchaseRepository(this.db);
      await purchaseRepo.handle(document._id, objClean(purchaseEntity), options);

      // update database
      const itemEntity = new ItemEntity({
        photoUrl: photoUrl,
      });
      const itemRepo = new UpdateManyItemRepository(this.db);
      await itemRepo.handle(
        {
          name: { $eq: document.name },
          color: { $eq: document.color },
        },
        { $set: objClean(itemEntity) },
        options
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}

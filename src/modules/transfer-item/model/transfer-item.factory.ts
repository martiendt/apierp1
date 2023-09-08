import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManyTransferItemRepository } from "./repository/create-many.repository.js";
import { CreateTransferItemRepository } from "./repository/create.repository.js";
import { TransferItemEntityInterface } from "./transfer-item.entity.js";
import { db } from "@src/database/database.js";

export default class TransferItemFactory extends Factory<TransferItemEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const transferItemRepository = new CreateTransferItemRepository(db);
    return await transferItemRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const transferItemRepository = new CreateManyTransferItemRepository(db);
    return await transferItemRepository.handle(this.makeMany(count));
  }
}

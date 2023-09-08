import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { InventoryEntityInterface } from "./inventory.js";
import { CreateManyInventoryRepository } from "./repository/create-many.repository.js";
import { CreateInventoryRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class InventoryFactory extends Factory<InventoryEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const inventoryRepository = new CreateInventoryRepository(db);
    return await inventoryRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const inventoryRepository = new CreateManyInventoryRepository(db);
    return await inventoryRepository.handle(this.makeMany(count));
  }
}

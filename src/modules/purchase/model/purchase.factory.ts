import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManyPurchaseRepository } from "./repository/create-many.repository.js";
import { CreatePurchaseRepository } from "./repository/create.repository.js";
import { PurchaseEntityInterface } from "./purchase.entity.js";
import { db } from "@src/database/database.js";

export default class PurchaseFactory extends Factory<PurchaseEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const purchaseRepository = new CreatePurchaseRepository(db);
    return await purchaseRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const purchaseRepository = new CreateManyPurchaseRepository(db);
    return await purchaseRepository.handle(this.makeMany(count));
  }
}

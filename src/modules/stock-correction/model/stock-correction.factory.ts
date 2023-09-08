import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManyStockCorrectionRepository } from "./repository/create-many.repository.js";
import { CreateStockCorrectionRepository } from "./repository/create.repository.js";
import { StockCorrectionEntityInterface } from "./stock-correction.entity.js";
import { db } from "@src/database/database.js";

export default class StockCorrectionFactory extends Factory<StockCorrectionEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const stockCorrectionRepository = new CreateStockCorrectionRepository(db);
    return await stockCorrectionRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const stockCorrectionRepository = new CreateManyStockCorrectionRepository(db);
    return await stockCorrectionRepository.handle(this.makeMany(count));
  }
}

import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManyStockOpnameRepository } from "./repository/create-many.repository.js";
import { CreateStockOpnameRepository } from "./repository/create.repository.js";
import { StockOpnameEntityInterface } from "./stock-opname.entity.js";
import { db } from "@src/database/database.js";

export default class StockOpnameFactory extends Factory<StockOpnameEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const stockOpnameRepository = new CreateStockOpnameRepository(db);
    return await stockOpnameRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const stockOpnameRepository = new CreateManyStockOpnameRepository(db);
    return await stockOpnameRepository.handle(this.makeMany(count));
  }
}

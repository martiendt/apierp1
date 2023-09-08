import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { FinanceEntityInterface } from "./finance.entity.js";
import { CreateManyFinanceRepository } from "./repository/create-many.repository.js";
import { CreateFinanceRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class FinanceFactory extends Factory<FinanceEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const financeRepository = new CreateFinanceRepository(db);
    return await financeRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const financeRepository = new CreateManyFinanceRepository(db);
    return await financeRepository.handle(this.makeMany(count));
  }
}

import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { BranchExpenseEntityInterface } from "./branch-expense.entity.js";
import { CreateManyBranchExpenseRepository } from "./repository/create-many.repository.js";
import { CreateBranchExpenseRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class BranchExpenseFactory extends Factory<BranchExpenseEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const stockCorrectionRepository = new CreateBranchExpenseRepository(db);
    return await stockCorrectionRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const stockCorrectionRepository = new CreateManyBranchExpenseRepository(db);
    return await stockCorrectionRepository.handle(this.makeMany(count));
  }
}

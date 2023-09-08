import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { BranchEntityInterface } from "./branch.entity.js";
import { CreateManyBranchRepository } from "./repository/create-many.repository.js";
import { CreateBranchRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class BranchFactory extends Factory<BranchEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const branchRepository = new CreateBranchRepository(db);
    return await branchRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const branchRepository = new CreateManyBranchRepository(db);
    return await branchRepository.handle(this.makeMany(count));
  }
}

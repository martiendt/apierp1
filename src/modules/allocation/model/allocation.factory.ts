import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { AllocationEntityInterface } from "./allocation.entity.js";
import { CreateManyAllocationRepository } from "./repository/create-many.repository.js";
import { CreateAllocationRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class AllocationFactory extends Factory<AllocationEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const allocationRepository = new CreateAllocationRepository(db);
    return await allocationRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const allocationRepository = new CreateManyAllocationRepository(db);
    return await allocationRepository.handle(this.makeMany(count));
  }
}

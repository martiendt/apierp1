import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { AllocationGroupEntityInterface } from "./allocation-group.entity.js";
import { CreateManyAllocationGroupRepository } from "./repository/create-many.repository.js";
import { CreateAllocationGroupRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class AllocationGroupFactory extends Factory<AllocationGroupEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const allocationGroupRepository = new CreateAllocationGroupRepository(db);
    return await allocationGroupRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const allocationGroupRepository = new CreateManyAllocationGroupRepository(db);
    return await allocationGroupRepository.handle(this.makeMany(count));
  }
}

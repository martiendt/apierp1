import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { SupplierGroupEntityInterface } from "./supplier-group.entity.js";
import { CreateManySupplierGroupRepository } from "./repository/create-many.repository.js";
import { CreateSupplierGroupRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class SupplierGroupFactory extends Factory<SupplierGroupEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const supplierGroupRepository = new CreateSupplierGroupRepository(db);
    return await supplierGroupRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const supplierGroupRepository = new CreateManySupplierGroupRepository(db);
    return await supplierGroupRepository.handle(this.makeMany(count));
  }
}

import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManySupplierRepository } from "./repository/create-many.repository.js";
import { CreateSupplierRepository } from "./repository/create.repository.js";
import { SupplierEntityInterface } from "./supplier.entity.js";
import { db } from "@src/database/database.js";

export default class SupplierFactory extends Factory<SupplierEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const supplierRepository = new CreateSupplierRepository(db);
    return await supplierRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const supplierRepository = new CreateManySupplierRepository(db);
    return await supplierRepository.handle(this.makeMany(count));
  }
}

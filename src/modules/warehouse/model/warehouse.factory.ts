import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManyWarehouseRepository } from "./repository/create-many.repository.js";
import { CreateWarehouseRepository } from "./repository/create.repository.js";
import { WarehouseEntityInterface } from "./warehouse.entity.js";
import { db } from "@src/database/database.js";

export default class WarehouseFactory extends Factory<WarehouseEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const warehouseRepository = new CreateWarehouseRepository(db);
    return await warehouseRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const warehouseRepository = new CreateManyWarehouseRepository(db);
    return await warehouseRepository.handle(this.makeMany(count));
  }
}

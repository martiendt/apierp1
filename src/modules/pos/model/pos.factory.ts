import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManyPosRepository } from "./repository/create-many.repository.js";
import { CreatePosRepository } from "./repository/create.repository.js";
import { PosEntityInterface } from "./pos.entity.js";
import { db } from "@src/database/database.js";

export default class PosFactory extends Factory<PosEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const posRepository = new CreatePosRepository(db);
    return await posRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const posRepository = new CreateManyPosRepository(db);
    return await posRepository.handle(this.makeMany(count));
  }
}

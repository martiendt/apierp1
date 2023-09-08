import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { ExpeditionEntityInterface } from "./expedition.entity.js";
import { CreateManyExpeditionRepository } from "./repository/create-many.repository.js";
import { CreateExpeditionRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class ExpeditionFactory extends Factory<ExpeditionEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const expeditionRepository = new CreateExpeditionRepository(db);
    return await expeditionRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const expeditionRepository = new CreateManyExpeditionRepository(db);
    return await expeditionRepository.handle(this.makeMany(count));
  }
}

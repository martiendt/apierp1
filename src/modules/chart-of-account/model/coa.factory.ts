import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CoaEntityInterface } from "./coa.entity.js";
import { CreateManyCoaRepository } from "./repository/create-many.repository.js";
import { CreateCoaRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class CoaFactory extends Factory<CoaEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const coaRepository = new CreateCoaRepository(db);
    return await coaRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const coaRepository = new CreateManyCoaRepository(db);
    return await coaRepository.handle(this.makeMany(count));
  }
}

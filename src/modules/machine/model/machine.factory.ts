import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { MachineEntityInterface } from "./machine.entity.js";
import { CreateManyMachineRepository } from "./repository/create-many.repository.js";
import { CreateMachineRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class MachineFactory extends Factory<MachineEntityInterface> {
  definition() {
    return {
      code: faker.name.fullName(),
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const machineRepository = new CreateMachineRepository(db);
    return await machineRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const machineRepository = new CreateManyMachineRepository(db);
    return await machineRepository.handle(this.makeMany(count));
  }
}

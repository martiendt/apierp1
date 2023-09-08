import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { UserEntityInterface, UserStatusTypes } from "./user.entity.js";
import { CreateManyUserRepository } from "./repository/create-many.repository.js";
import { CreateUserRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class UserFactory extends Factory<UserEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      status: UserStatusTypes.Active,
      createdAt: new Date(),
    };
  }

  async create() {
    const userRepository = new CreateUserRepository(db);
    return await userRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const userRepository = new CreateManyUserRepository(db);
    return await userRepository.handle(this.makeMany(count));
  }
}

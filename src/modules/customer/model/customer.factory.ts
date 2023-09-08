import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CustomerEntityInterface } from "./customer.entity.js";
import { CreateManyCustomerRepository } from "./repository/create-many.repository.js";
import { CreateCustomerRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class CustomerFactory extends Factory<CustomerEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const customerRepository = new CreateCustomerRepository(db);
    return await customerRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const customerRepository = new CreateManyCustomerRepository(db);
    return await customerRepository.handle(this.makeMany(count));
  }
}

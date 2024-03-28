import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CustomerGroupEntityInterface } from "./customer-group.entity.js";
import { CreateManyCustomerGroupRepository } from "./repository/create-many.repository.js";
import { CreateCustomerGroupRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class CustomerGroupFactory extends Factory<CustomerGroupEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const customerGroupRepository = new CreateCustomerGroupRepository(db);
    return await customerGroupRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const customerGroupRepository = new CreateManyCustomerGroupRepository(db);
    return await customerGroupRepository.handle(this.makeMany(count));
  }
}

import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { ItemEntityInterface } from "./item.entity.js";
import { CreateManyItemRepository } from "./repository/create-many.repository.js";
import { CreateItemRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class ItemFactory extends Factory<ItemEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const itemRepository = new CreateItemRepository(db);
    return await itemRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const itemRepository = new CreateManyItemRepository(db);
    return await itemRepository.handle(this.makeMany(count));
  }
}

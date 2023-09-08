import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { ItemCategoryEntityInterface } from "./item-category.entity.js";
import { CreateManyItemCategoryRepository } from "./repository/create-many.repository.js";
import { CreateItemCategoryRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class ItemCategoryFactory extends Factory<ItemCategoryEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const itemCategoryRepository = new CreateItemCategoryRepository(db);
    return await itemCategoryRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const itemCategoryRepository = new CreateManyItemCategoryRepository(db);
    return await itemCategoryRepository.handle(this.makeMany(count));
  }
}

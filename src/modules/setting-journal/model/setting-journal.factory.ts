import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CreateManySettingJournalRepository } from "./repository/create-many.repository.js";
import { CreateSettingJournalRepository } from "./repository/create.repository.js";
import { SettingJournalEntityInterface } from "./setting-journal.entity.js";
import { db } from "@src/database/database.js";

export default class SettingJournalFactory extends Factory<SettingJournalEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const settingJournalRepository = new CreateSettingJournalRepository(db);
    return await settingJournalRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const settingJournalRepository = new CreateManySettingJournalRepository(db);
    return await settingJournalRepository.handle(this.makeMany(count));
  }
}

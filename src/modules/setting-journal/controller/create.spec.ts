import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import { SettingJournalStatusTypes } from "../model/setting-journal.entity.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an settingJournal", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create an settingJournal", async () => {
    const app = await createApp();

    const data = {
      name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const response = await request(app).post("/v1/settingJournals").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const settingJournalRecord = await retrieve("settingJournals", response.body._id);

    expect(settingJournalRecord._id).toStrictEqual(response.body._id);
    expect(settingJournalRecord.name).toStrictEqual(data.name);
    expect(settingJournalRecord.status).toStrictEqual(SettingJournalStatusTypes.Active);
    expect(isValid(new Date(settingJournalRecord.createdAt))).toBeTruthy();
  });
});

import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import SettingJournalFactory from "../model/settingJournal.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update an settingJournal", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update an settingJournal", async () => {
    const app = await createApp();

    const resultFactory = await new SettingJournalFactory().createMany(3);

    const data = await retrieveAll("settingJournals");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/settingJournals/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const settingJournalRecord = await retrieve("settingJournals", resultFactory.insertedIds[1]);
    expect(settingJournalRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(settingJournalRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedSettingJournalRecord = await retrieve("settingJournals", resultFactory.insertedIds[0]);
    expect(unmodifiedSettingJournalRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedSettingJournalRecord.updatedAt).toBeUndefined();
  });
});

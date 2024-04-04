import request from "supertest";
import SettingJournalFactory from "../model/settingJournal.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete an settingJournal", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete an settingJournal", async () => {
    const app = await createApp();

    const settingJournalFactory = new SettingJournalFactory();
    const resultFactory = await settingJournalFactory.createMany(3);

    const response = await request(app).delete(`/v1/settingJournals/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const settingJournalRecord = await retrieve("settingJournals", resultFactory.insertedIds[1]);
    expect(settingJournalRecord).toBeNull();

    const settingJournalRecords = await retrieveAll("settingJournals");
    expect(settingJournalRecords.length).toStrictEqual(2);
  });
});

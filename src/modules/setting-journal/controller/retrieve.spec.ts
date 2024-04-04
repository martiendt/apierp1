import { isValid } from "date-fns";
import request from "supertest";
import { SettingJournalStatusTypes } from "../model/setting-journal.entity.js";
import SettingJournalFactory from "../model/settingJournal.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve an settingJournal", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an settingJournal", async () => {
    const app = await createApp();

    const settingJournalFactory = new SettingJournalFactory();
    const resultFactory = await settingJournalFactory.createMany(3);
    const data = await retrieveAll("settingJournals");

    const response = await request(app).get(`/v1/settingJournals/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(response.body.status).toStrictEqual(SettingJournalStatusTypes.Active);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});

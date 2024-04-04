import { isValid } from "date-fns";
import request from "supertest";
import { SettingJournalStatusTypes } from "../model/setting-journal.entity.js";
import SettingJournalFactory from "../model/settingJournal.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve all settingJournals", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve all settingJournals", async () => {
    const app = await createApp();

    const settingJournalFactory = new SettingJournalFactory();
    await settingJournalFactory.createMany(3);

    const data = await retrieveAll("settingJournals");

    const response = await request(app).get(`/v1/settingJournals`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.settingJournals.length).toStrictEqual(3);
    expect(response.body.settingJournals[0]._id).toBeDefined();
    expect(response.body.settingJournals[0].name).toStrictEqual(data[0].name);
    expect(response.body.settingJournals[0].status).toStrictEqual(SettingJournalStatusTypes.Active);
    expect(isValid(new Date(response.body.settingJournals[0].createdAt))).toBeTruthy();
    expect(response.body.settingJournals[1].name).toStrictEqual(data[1].name);
    expect(response.body.settingJournals[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in ascending order", async () => {
    const app = await createApp();

    const settingJournalFactory = new SettingJournalFactory();
    const data = [
      {
        name: "John Doe",
      },
      {
        name: "Charles",
      },
      {
        name: "Jane",
      },
    ];
    settingJournalFactory.sequence(data);
    await settingJournalFactory.createMany(3);

    const response = await request(app).get(`/v1/settingJournals`).query({
      sort: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.settingJournals.length).toStrictEqual(3);
    expect(response.body.settingJournals[0].name).toStrictEqual(data[1].name);
    expect(response.body.settingJournals[1].name).toStrictEqual(data[2].name);
    expect(response.body.settingJournals[2].name).toStrictEqual(data[0].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in descending order", async () => {
    const app = await createApp();

    const settingJournalFactory = new SettingJournalFactory();
    const data = [
      {
        name: "John Doe",
      },
      {
        name: "Charles",
      },
      {
        name: "Jane",
      },
    ];
    settingJournalFactory.sequence(data);
    await settingJournalFactory.createMany(3);

    const response = await request(app).get(`/v1/settingJournals`).query({
      sort: "-name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.settingJournals.length).toStrictEqual(3);
    expect(response.body.settingJournals[0].name).toStrictEqual(data[0].name);
    expect(response.body.settingJournals[1].name).toStrictEqual(data[2].name);
    expect(response.body.settingJournals[2].name).toStrictEqual(data[1].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to navigate pagination", async () => {
    const app = await createApp();

    const settingJournalFactory = new SettingJournalFactory();
    await settingJournalFactory.createMany(3);

    const data = await retrieveAll("settingJournals");

    const response = await request(app).get(`/v1/settingJournals`).query({
      page: 2,
      pageSize: 2,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.settingJournals.length).toStrictEqual(1);
    expect(response.body.settingJournals[0].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(2);
    expect(response.body.pagination.pageSize).toStrictEqual(2);
    expect(response.body.pagination.pageCount).toStrictEqual(2);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to choose fields", async () => {
    const app = await createApp();

    const settingJournalFactory = new SettingJournalFactory();
    await settingJournalFactory.createMany(3);

    const data = await retrieveAll("settingJournals");

    const response = await request(app).get(`/v1/settingJournals`).query({
      fields: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.settingJournals.length).toStrictEqual(3);
    expect(response.body.settingJournals[0]._id).toBeDefined();
    expect(response.body.settingJournals[1]._id).toBeDefined();
    expect(response.body.settingJournals[2]._id).toBeDefined();
    expect(response.body.settingJournals[0].name).toStrictEqual(data[0].name);
    expect(response.body.settingJournals[1].name).toStrictEqual(data[1].name);
    expect(response.body.settingJournals[2].name).toStrictEqual(data[2].name);
    expect(response.body.settingJournals[0].status).toBeUndefined();
    expect(response.body.settingJournals[1].status).toBeUndefined();
    expect(response.body.settingJournals[2].status).toBeUndefined();
    expect(response.body.settingJournals[0].createdAt).toBeUndefined();
    expect(response.body.settingJournals[1].createdAt).toBeUndefined();
    expect(response.body.settingJournals[2].createdAt).toBeUndefined();

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});

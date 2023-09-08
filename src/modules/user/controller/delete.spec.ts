import request from "supertest";
import UserFactory from "../model/user.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete an user", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete an user", async () => {
    const app = await createApp();

    const userFactory = new UserFactory();
    const resultFactory = await userFactory.createMany(3);

    const response = await request(app).delete(`/v1/users/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const userRecord = await retrieve("users", resultFactory.insertedIds[1]);
    expect(userRecord).toBeNull();

    const userRecords = await retrieveAll("users");
    expect(userRecords.length).toStrictEqual(2);
  });
});

import { isValid } from "date-fns";
import request from "supertest";
import { UserStatusTypes } from "../model/user.entity.js";
import UserFactory from "../model/user.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve an user", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an user", async () => {
    const app = await createApp();

    const userFactory = new UserFactory();
    const resultFactory = await userFactory.createMany(3);
    const data = await retrieveAll("users");

    const response = await request(app).get(`/v1/users/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(response.body.status).toStrictEqual(UserStatusTypes.Active);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});

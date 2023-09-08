import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import { UserStatusTypes } from "../model/user.entity.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an user", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create an user", async () => {
    const app = await createApp();

    const data = {
      name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const response = await request(app).post("/v1/users").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const userRecord = await retrieve("users", response.body._id);

    expect(userRecord._id).toStrictEqual(response.body._id);
    expect(userRecord.name).toStrictEqual(data.name);
    expect(userRecord.status).toStrictEqual(UserStatusTypes.Active);
    expect(isValid(new Date(userRecord.createdAt))).toBeTruthy();
  });
});

import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import UserFactory from "../model/user.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update an user", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update an user", async () => {
    const app = await createApp();

    const resultFactory = await new UserFactory().createMany(3);

    const data = await retrieveAll("users");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/users/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const userRecord = await retrieve("users", resultFactory.insertedIds[1]);
    expect(userRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(userRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedUserRecord = await retrieve("users", resultFactory.insertedIds[0]);
    expect(unmodifiedUserRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedUserRecord.updatedAt).toBeUndefined();
  });
});

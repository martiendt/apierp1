import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import { CoaStatusTypes } from "../model/coa.entity.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an coa", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create an coa", async () => {
    const app = await createApp();

    const data = {
      name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const response = await request(app).post("/v1/coas").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const coaRecord = await retrieve("coas", response.body._id);

    expect(coaRecord._id).toStrictEqual(response.body._id);
    expect(coaRecord.name).toStrictEqual(data.name);
    expect(coaRecord.status).toStrictEqual(CoaStatusTypes.Active);
    expect(isValid(new Date(coaRecord.createdAt))).toBeTruthy();
  });
});

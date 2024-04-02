import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import CoaFactory from "../model/coa.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update an coa", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update an coa", async () => {
    const app = await createApp();

    const resultFactory = await new CoaFactory().createMany(3);

    const data = await retrieveAll("coas");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/coas/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaRecord = await retrieve("coas", resultFactory.insertedIds[1]);
    expect(coaRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(coaRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedCoaRecord = await retrieve("coas", resultFactory.insertedIds[0]);
    expect(unmodifiedCoaRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedCoaRecord.updatedAt).toBeUndefined();
  });
});

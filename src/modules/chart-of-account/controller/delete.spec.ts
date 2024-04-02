import request from "supertest";
import CoaFactory from "../model/coa.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete an coa", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete an coa", async () => {
    const app = await createApp();

    const coaFactory = new CoaFactory();
    const resultFactory = await coaFactory.createMany(3);

    const response = await request(app).delete(`/v1/coas/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaRecord = await retrieve("coas", resultFactory.insertedIds[1]);
    expect(coaRecord).toBeNull();

    const coaRecords = await retrieveAll("coas");
    expect(coaRecords.length).toStrictEqual(2);
  });
});

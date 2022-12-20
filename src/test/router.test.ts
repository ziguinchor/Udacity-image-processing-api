import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("should send 200 status code", async () => {
    await request(app).get("/").expect(200);
  });
});

import request from "supertest";
import app from "../app";

describe("GET /images?image=inexistentImage", () => {
  it("should send 404 status code", async () => {
    await request(app).get("/images?image=InexistentImage").expect(404);
  });
});

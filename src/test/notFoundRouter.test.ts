import request from "supertest";
import app from "../app";

describe("GET /images?name=InexistentImage&width=100&heigh=100", () => {
  it("should send 404 status code if image does not exists", (done) => {
    request(app)
      .get("/")
      .end(function (_, res) {
        expect(res.statusCode).toEqual(200);

        done();
      });
  });
});

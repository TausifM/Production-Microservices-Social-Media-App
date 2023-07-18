import request from "supertest";
import app from "../app";

it("name", () => {
  request(app).get("/").expect(200);
});

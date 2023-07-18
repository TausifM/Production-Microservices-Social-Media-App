import request from "supertest";
import app from "../../app";

// DB life cycle methods

// beforeAll(() => {
//   // start the DB connection
// }

// beforeEach(() => {
//   // clean data base, in which any extra entities
// });

// afterAll(() => {
//   // close the database connection
// });

it("should return 405 for non-post requests to the signup route", () => {});
it("should return an error 422 if the email isnot valid", async () => {
  await request(app).post("/api/auth/signup").expect(422);
});

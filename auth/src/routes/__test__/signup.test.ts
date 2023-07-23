import request from "supertest";
import app from "../../app";
import { SIGNUP_ROUTE } from "../route-defs";
import { User } from "../../models";

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

/**
 * Validity Email consition
 * std email validation by using express-valuidator
 */
describe("", () => {
  let password = "";
  beforeAll(() => {
    password = "Test@123";
  });
  it("should return an error 422 if the password isnot provided", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ password }).expect(422);
  });
  it("should return an error 422 if the email isnot valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ password }).expect(422);

    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: "this is invalid email", password })
      .expect(422);
  });
  it("should return an error 201 if the email valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email: "test@test.com", password }).expect(201);
  });
});

/**
 * Valid Password Conditions
 * min 8 charcters
 * max 32 charch
 * one lower casae
 * one upper case
 * one special charch
 */

describe("test validity of password input", () => {
  let email = "";
  beforeAll(() => {
    email = "test@test.com";
  });
  it("length of password not less than 8", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "Valid@1" }).expect(422);
  });
  it("length of password not more than 32", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: "Valid@1Valid@1Valid@1Valid@1Valid@1" })
      .expect(422);
  });
  it("have a lower case", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email }).expect(422);
  });
  it("have a upper case", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email }).expect(422);
  });
  it("have a special character", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email }).expect(422);
  });
  it("should return an error 201 if the email valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "Valid@123" }).expect(201);
  });
});

describe("test sanitization of user input", () => {
  const email = "test@test.com";
  it("should not contain escape character", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "Valid<>" }).expect(422);
  });
});

describe("test for saving the sign up user to DB", () => {
  const validUserInfo = {
    email: "test@test.com",
    password: "Valid@123"
  };
  it("save the info successfully as the valid info", async () => {
    // Send valid user info
    // receive the user info back from the route
    // check wheather I can find the user in the DB by using _id or email property
    const response = await request(app).post(SIGNUP_ROUTE).send(validUserInfo).expect(201);
    // expect(response.body.email).toEqual(userInfo.email); // initial test
    const user = await User.findOne({ email: response.body.email });
    const userEmail = user ? user.email : "";
    // console.log(user, "user") // initially null
    expect(user).toBeDefined();
    expect(userEmail).toEqual(validUserInfo.email);
  });
  it("doesnot allow the duplicate user or email", async () => {
    // Send valid user info
    // send valid info again to check duplicates email
    // should return respective HTTP error code
    await request(app).post(SIGNUP_ROUTE).send(validUserInfo).expect(201);
    await request(app).post(SIGNUP_ROUTE).send(validUserInfo).expect(422);
  });
});

import User from "../user";

it("should not save a new user if the email is already in the database", async () => {
  const userInfo = {
    email: "test@test.com",
    password: "Valid123"
  };
  const newUser1 = await User.create(userInfo);
  expect(newUser1).toBeDefined();
  expect(newUser1.email).toEqual(userInfo.email);
  let err;
  try {
    await User.create(userInfo);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    err = error;
  }

  expect(err).toBeDefined();
  expect(err.message).toEqual('email is already in the DB')
});

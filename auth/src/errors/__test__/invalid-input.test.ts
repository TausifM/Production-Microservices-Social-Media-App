import { InValidInput } from "../index";
import { InvalidInputConstructorErrorsParam } from "../invalid-input";

it("it should have  a status code 422", () => {
  const invalidInputError = new InValidInput();
  expect(invalidInputError.getStatusCode()).toEqual(422);
});

it("should return in serialized format", () => {
  const errors: InvalidInputConstructorErrorsParam = [
    {
      value: "valid12",
      msg: "Password must be between 8 and 32 characters",
      type: "field",
      path: "password",
      location: "body"
    },
    {
      value: "valid12",
      msg: "Password must contain an uppercase letter",
      type: "field",
      path: "password",
      location: "body"
    }
  ];
});

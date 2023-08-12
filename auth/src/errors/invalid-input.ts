import { ValidationError } from "express-validator";
import BaseCustomError from "./base-custom-error";
import { SerializedErrorField, SerializedErrorOutput } from "./types/serialized-error-output";

export type InvalidInputConstructorErrorsParam = ValidationError[];

export default class InValidInput extends BaseCustomError {
  private readonly errors: ValidationError[] | undefined;

  private statusCode = 422;

  private defaultErrorMessage = "The input provided is invalid";

  constructor(errors?: InvalidInputConstructorErrorsParam) {
    super("The input provided is invalid");
    this.errors = errors;
    Object.setPrototypeOf(this, InValidInput.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): SerializedErrorOutput {
    return this.parseValidationErrors();
  }

  private parseValidationErrors(): SerializedErrorOutput {
    const parsedErrors: SerializedErrorField = {};

    if (this.errors && this.errors.length > 0) {
      this.errors.forEach((error) => {
        if (parsedErrors[error.msg]) {
          console.log(error, "errrr");
          parsedErrors[error.msg].push(error.msg);
        } else {
          parsedErrors[error.msg] = [error.msg];
        }
      });
    }

    return {
      errors: [
        {
          message: this.defaultErrorMessage,
          fields: parsedErrors
        }
      ]
    };
  }
}

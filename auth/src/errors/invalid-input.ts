import { ValidationError } from "express-validator";
import BaseCustomError from "./base-custom-error";
import { SerializedErrorField, SerializedErrorOutput } from "./types/serialized-error-output";

export default class InvalidInput extends BaseCustomError {
  private readonly errors: ValidationError[] | undefined;

  private statusCode = 422;

  private defaultErrorMessage = "The input provided is invalid";

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidInput.prototype);
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
        if (parsedErrors[error.param]) {
          parsedErrors[error.param].push(error.msg);
        } else {
          parsedErrors[error.param] = [error.msg];
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

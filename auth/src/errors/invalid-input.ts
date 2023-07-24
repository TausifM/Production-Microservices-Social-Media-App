/* eslint-disable @typescript-eslint/no-useless-constructor */
import { BaseCustomError } from "./base-custom-error";

export class InvalidInput extends BaseCustomError {
  statusCode = 422;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidInput.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): unknown {
    return undefined;
  }
}

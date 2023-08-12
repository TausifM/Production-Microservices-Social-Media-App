import { Response, NextFunction } from "express";
import { BaseCustomError } from "../errors";

const errorHandler = (err: Error, res: Response, _next: NextFunction) => {
  if (err instanceof BaseCustomError) {
    return res.sendStatus(400);
  }
  return res.sendStatus(500);
};

export default errorHandler;

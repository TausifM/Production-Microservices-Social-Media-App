import { Response, NextFunction } from "express";

const errorHandler = (err: Error, res: Response, _next: NextFunction) => {
  if (err) {
    return res.sendStatus(422);
  }
  return res.sendStatus(500);
};

export default errorHandler;

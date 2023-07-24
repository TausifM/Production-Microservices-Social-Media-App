import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { SIGNUP_ROUTE } from "./route-defs";
import { User } from "../models";

const signupRouter = express.Router();

signupRouter.post(
  SIGNUP_ROUTE,
  [
    body("email").isEmail().withMessage("Email must be in valid format").normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8, max: 32 })
      .withMessage("Password must be in valid format"),
    body("password")
      .matches(/^(.*[A-Z].*)$/)
      .withMessage("Password must contain at least one uppercase letter"),
    body("password")
      .matches(/^(.*\d.*)$/)
      .withMessage("Password must contain at least one digit"),
    body("password").escape()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({}); // return so it will not execute further code
    }
    if (/.+@[A-Z]/g.test(req.body.email)) {
      return res.status(422).send({});
      // errors.push({
      //   location: "body",
      //   value: req.body.email,
      //   param: "email",
      //   msg: "Email is not normalized"
      // });
    }
    if (/[><'"/]/g.test(req.body.password)) {
      return res.status(422).send({});
      // errors.push({
      //   location: "body",
      //   value: req.body.password,
      //   param: "password",
      //   msg: "Password contains invalid characters"
      // });
    }
    const { email, password } = req.body;
    try {
      const newUser = await User.create({ email, password });
      // console.log(newUser, "newUser"); //three users are created after each save
      return res.status(201).send({ email: newUser.email });
    } catch (error) {
      return res.sendStatus(422);
    }
  }
);

export default signupRouter;

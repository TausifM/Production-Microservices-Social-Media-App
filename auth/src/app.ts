/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import { json } from "body-parser";
import { signupRouter } from "./routes";

const app = express();

app.use(json());
app.use(signupRouter);

export default app;

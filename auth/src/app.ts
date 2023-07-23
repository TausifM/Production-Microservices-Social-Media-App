import express from "express";
import { json } from "body-parser";
import { signupRouter } from "./routes";

const app = express();

app.use(json({ limit: "50mb" }));
app.use(signupRouter);

export default app;

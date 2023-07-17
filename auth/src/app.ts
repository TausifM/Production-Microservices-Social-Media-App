import express from "express";

const app = express();

app.get("*", (req, res) => {
  res.send({});
});

// eslint-disable-next-line import/prefer-default-export
export { app };

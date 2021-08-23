const express = require("express");
const { checkSchema } = require("express-validator");
const { createSchema, updateValidator } = require("./lib/validator");
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require("./lib/controller");
const jsonParserMiddleware = require("./lib/middleware/jsonParser");
const validationMiddleware = require("./lib/middleware/validation");
const database = require("./lib/database");
const app = express();
const port = process.env.PORT || 8080;
const connectionString =
  process.env.CONNECTION_STRING || "mongodb://localhost/test";

app.use(jsonParserMiddleware);

app.get("/address", getAll);

app.post(
  "/address",
  checkSchema(createSchema),
  validationMiddleware,
  createOne
);

app.get("/address/:id", getOne);

app.patch("/address/:id", updateValidator, validationMiddleware, updateOne);

app.delete("/address/:id", deleteOne);

app.use((req, res, next) => {
  const error = new Error("resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

database(connectionString, (err) => {
  if (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const express = require("express");
const middlewares = require("../middlewares");
const router = require("../routes");

const createServer = () => {
  const app = express();

  // middlewares
  middlewares.forEach((middleware) => app.use(middleware));

  // router
  app.use("/api/v1", router);

  return app;
};

module.exports = createServer;

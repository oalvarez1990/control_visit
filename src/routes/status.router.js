const {
  getStatus,
  createStatus,
} = require("../controllers/status.controllers");
const express = require("express");
//
const statusRouter = express.Router();
//routes
statusRouter.get("/", getStatus);
statusRouter.post("/", createStatus);

module.exports = statusRouter;

const {
  getVisitors,
  createVisitor,
} = require("../controllers/visitors.controllers");
const express = require("express");
//
const visitorRouter = express.Router();
//routes
visitorRouter.get("/", getVisitors);
visitorRouter.post("/", createVisitor);

module.exports = visitorRouter;

const { getPositions,createPosition } = require("../controllers/position.controllers");
const express = require("express");
//
const positionRouter = express.Router();
//routes
positionRouter.get("/", getPositions);
positionRouter.post("/", createPosition);

module.exports = positionRouter;
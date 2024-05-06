const { getThings,createThing } = require("../controllers/things.controllers");
const express = require("express");
//
const thingRouter = express.Router();
//routes
thingRouter.route("/").get(getThings);
thingRouter.route("/").post(createThing);

module.exports = thingRouter;

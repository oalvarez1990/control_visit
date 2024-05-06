const { getEps, createEps} = require("../controllers/eps.controllers");
const express = require("express");
//
const epsRouter = express.Router();
//routes
epsRouter.route("/").get(getEps);
epsRouter.route("/").post(createEps);

module.exports = epsRouter;

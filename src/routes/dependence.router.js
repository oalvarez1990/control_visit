const { getDependences,createDependance } = require("../controllers/dependence.controllers");
const express = require("express");
//
const dependenceRouter = express.Router();
//routes
dependenceRouter.route("/").get(getDependences);
dependenceRouter.route("/").post(createDependance);


//
module.exports = dependenceRouter;

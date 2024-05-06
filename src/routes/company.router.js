const { getCompanies,createCompany } = require("../controllers/company.controllers");
const express = require("express");
// 
const companyRouter = express.Router();
//routes
companyRouter.route("/").get(getCompanies);
companyRouter.route("/").post(createCompany);


module.exports = companyRouter;

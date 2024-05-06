const {
  getEmployees,
  createEmployee,
} = require("../controllers/employee.controllers");
const express = require("express");
//
const employeeRouter = express.Router();
//routes
employeeRouter.route("/").get(getEmployees);
employeeRouter.route("/").post(createEmployee);

//
module.exports = employeeRouter;

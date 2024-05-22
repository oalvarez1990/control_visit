const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByCode,
} = require("../controllers/employee.controllers");
const express = require("express");
//
const employeeRouter = express.Router();
//routes
employeeRouter.route("/").get(getEmployees);
employeeRouter.route("/").post(createEmployee);
employeeRouter.route("/").put(updateEmployee);
employeeRouter.route("/").delete(deleteEmployee);
employeeRouter.route("/").get(getEmployeeByCode);

//
module.exports = employeeRouter;

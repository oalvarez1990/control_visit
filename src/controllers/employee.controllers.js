const Employee = require("../models/employees");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

const getEmployees = catchError(async (req = request, res = response) => {
  const employees = await Employee.find();
  res.json({ employees });
});
//Create employee
const createEmployee = catchError(async (req = request, res = response) => {
  const {
    names_employee,
    lastaname_employee,
    email_employee,
    phone_employee,
    extension_employee,
    dependence,
  } = req.body;
  // validate if name is string and not empty
  if (!req.body.names_employee || typeof req.body.names_employee !== "string") {
    return res.status(400).json({ error: "The name is required" });
  } else if (
    !req.body.email_employee ||
    typeof req.body.email_employee !== "string"
  ) {
    return res.status(400).json({ error: "The email is required" });
  } else {
    const newEmployee = new Employee({
      names_employee,
      lastaname_employee,
      email_employee,
      phone_employee,
      extension_employee,
      dependence,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee created", newEmployee });
  }
});

//Update employee

module.exports = {
  getEmployees,
    createEmployee,
};

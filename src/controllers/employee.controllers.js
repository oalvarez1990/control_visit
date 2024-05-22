const Employee = require("../models/employees");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

const getEmployees = catchError(async (req = request, res = response) => {
  const employees = await Employee.find();
  res.json({ employees });
});
// Get employee by code_employee
const getEmployeeByCode = catchError(async (req = request, res = response) => {
  const { code_employee } = req.query;
  const employee = await Employee.findOne({ code_employee });
  if (!employee) {
    return res.status(404).json({ message: "The employee is not registered" });
  }
  res.json({ employee });
});

// Create employee
const createEmployee = catchError(async (req = request, res = response) => {
  const {
    names_employee,
    lastname_employee,
    email_employee,
    phone_employee,
    extension_employee,
    dependence,
    code_employee,
  } = req.body;

  // Validate if name is string and not empty
  if (!names_employee || typeof names_employee !== "string") {
    return res.status(400).json({ error: "The name is required" });
  } else if (!email_employee || typeof email_employee !== "string") {
    return res.status(400).json({ error: "The email is required" });
  } else {
    const newEmployee = new Employee({
      names_employee,
      lastname_employee,
      email_employee,
      phone_employee,
      extension_employee,
      dependence,
      code_employee,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee created", newEmployee });
  }
});

// Update employee
const updateEmployee = catchError(async (req = request, res = response) => {
  const { code_employee } = req.body;
  const employee = await Employee.findOne({ code_employee });
  if (!employee) {
    return res.status(404).json({ message: "The employee is not registered" });
  }

  const {
    names_employee,
    lastname_employee,
    email_employee,
    phone_employee,
    extension_employee,
    dependence,
  } = req.body;

  employee.names_employee = names_employee || employee.names_employee;
  employee.lastname_employee = lastname_employee || employee.lastname_employee;
  employee.email_employee = email_employee || employee.email_employee;
  employee.phone_employee = phone_employee || employee.phone_employee;
  employee.extension_employee =
    extension_employee || employee.extension_employee;
  employee.dependence = dependence || employee.dependence;

  await employee.save();
  res.json({ message: "Employee updated", employee });
});

// Delete employee
const deleteEmployee = catchError(async (req = request, res = response) => {
  const { code_employee } = req.body;
  const employee = await Employee.findOneAndDelete({ code_employee });
  if (!employee) {
    return res.status(404).json({ message: "The employee is not registered" });
  }
  res.json({ message: "Employee deleted", employee });
});

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByCode,
};

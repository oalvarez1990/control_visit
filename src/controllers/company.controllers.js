const { request, response } = require("express");
const Company = require("../models/company");
const catchError = require("../utils/catchError");

// Get all the entity of  company
const getCompanies = catchError(async (req = request, res = response) => {
  const companies = await Company.find();
  res.json({ companies });
});
// Create a new entity of company
const createCompany = catchError(async (req = request, res = response) => {
  const {
    type_id_company,
    number_id_company,
    name_company,
    email_company,
    phone_number_company,
    address_company,
    city_company,
  } = req.body;

  // Validate email is unique in the bd
  const existingEmail = await Company.findOne({ email_company });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Validate number_id_company is unique in the bd
  const existingNumber = await Company.findOne({ number_id_company });
  if (existingNumber) {
    return res.status(400).json({ message: "Number ID of the company already exists" });
  }

  // Here create company, if both email and number_id_company are unique, create a new company
  const newCompany = new Company({
    type_id_company,
    number_id_company,
    name_company,
    email_company,
    phone_number_company,
    address_company,
    city_company,
  });

  await newCompany.save();

  return res.status(201).json({ newCompany });
});

module.exports = {
  getCompanies,
  createCompany,
};

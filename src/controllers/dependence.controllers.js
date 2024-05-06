const { request } = require("express");
const Dependence = require("../models/dependences");
const catchError = require("../utils/catchError");
// TODO: Get endpoint dependence
const getDependences = catchError(async (req = request, res = response) => {
  const dependences = await Dependence.find();
  res.json({ dependences });
});
// TODO: Create endpoint dependence
const createDependance = catchError(async (req = request, res = response) => {
  const { code_dependence, name_dependence, id_company } = req.body;
  const existingCode = await Dependence.findOne({ code_dependence });
  if (existingCode) {
    return res.status(400).json({ message: "Code already exists" });
  }
  const existingName = await Dependence.findOne({ name_dependence });
  if (existingName) {
    return res.status(400).json({ message: "Name already exists" });
  }
  const newDependance = new Dependence({
    code_dependence,
    name_dependence,
    id_company,
  });
  await newDependance.save();
  res.status(201).json({ newDependance });
});
// TODO: Update endpoint dependence

module.exports = {
  getDependences,
  createDependance,
};

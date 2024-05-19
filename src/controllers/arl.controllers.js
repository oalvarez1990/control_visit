const Arl = require("../models/arl");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

const getArl = catchError(async (req = request, res = response) => {
  const arl = await Arl.find();
  res.json({ arl });
});

const createArl = catchError(async (req = request, res = response) => {
  const { code_arl, name_arl } = req.body;
  if (!req.body.code_arl || typeof req.body.code_arl !== "string") {
    return res.status(400).json({ error: "The code is required" });
  } else if (!req.body.name_arl || typeof req.body.name_arl !== "string") {
    return res.status(400).json({ error: "The name is required" });
  } else {
    const newArl = new Arl({
      code_arl,
      name_arl,
    });

    await newArl.save();

    res.status(201).json({ message: "Arl created", newArl });
  }
});
const updateArl = catchError(async (req = request, res = response) => {
  const { id } = req.params;
  const { code_arl, name_arl } = req.body;
  const arl = await Arl.findByIdAndUpdate(
    id,
    { code_arl, name_arl },
    { new: true }
  );
  res.json({ message: "Arl updated", arl });
});
const deleteArl = catchError(async (req = request, res = response) => {
  const { id } = req.params;
  await Arl.findByIdAndDelete(id);
  res.json({ message: "Arl deleted" });
});

module.exports = {
  getArl,
  createArl,
  updateArl,
  deleteArl,
};

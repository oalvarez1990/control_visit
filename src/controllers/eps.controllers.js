const Eps = require("../models/eps");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

const getEps = catchError(async (req = request, res = response) => {
  const eps = await Eps.find();
  res.json({ eps });
});
// TODO: Create endpoint eps
const createEps = catchError(async (req = request, res = response) => {
  const { code_eps, name_eps } = req.body;
  // validate if name is string and not empty
  if (!req.body.code_eps || typeof req.body.code_eps !== "string") {
    return res.status(400).json({ error: "The code is required" });
  } else if (!req.body.name_eps || typeof req.body.name_eps !== "string") {
    return res.status(400).json({ error: "The name is required" });
  } else {
    const newEps = new Eps({
      code_eps,
      name_eps,
    });

    await newEps.save();

    res.status(201).json({ message: "Eps created", newEps });
  }
});
// TODO: Update endpoint eps

module.exports = {
  getEps,
  createEps,
};

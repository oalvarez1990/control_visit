const Position = require("../models/positions");
const { request, response } = require("express");
const catchError = require("../utils/catchError");
// TODO:Get all positions
const getPositions = catchError(async (req = request, res = response) => {
  const positions = await Position.find();
  res.json({ positions });
});
// TODO: Create endpoint position
const createPosition = catchError(async (req = request, res = response) => {
  const { code_position, name_position } = req.body;
  // Validate position not duplicate
  const positionExist = await Position.findOne({ code_position });
  if (positionExist) throw "The position already exists";
  else {
    const newPosition = new Position({ code_position, name_position });
    await newPosition.save();
    return res.status(201).json({ newPosition });
  }
});
// TODO: Get one position by id




module.exports = {
  getPositions,
  createPosition,
};

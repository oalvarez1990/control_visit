const Thing = require("../models/things");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

const getThings = catchError(async (req = request, res = response) => {
  const things = await Thing.find();
  res.json({ things });
});
// TODO: Create endpoint of things
const createThing = catchError(async (req = request, res = response) => {
  const { name_thing, serial } = req.body;
  const thing = new Thing({ name_thing, serial });
  await thing.save();
  res.json({ thing });
});

module.exports = {
  getThings,
  createThing,
};

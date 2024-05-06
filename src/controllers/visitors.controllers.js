const Visitors = require("../models/visitors");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

// TODO: Get all visitors
const getVisitors = catchError(async (req = request, res = response) => {
  const visitors = await Visitors.find();
  res.json({ visitors });
});
//TODO: Create visitor in company
const createVisitor = catchError(async (req = request, res = response) => {
  const {
    names_visitor,
    lastname_visitor,
    photo_visitor,
    type_id_visitor,
    number_id_visitor,
    email_visitor,
    phone_visitor,
    company_where_visitor,
    things,
    eps,
    position,
  } = req.body;

  const visitor = new Visitors({
    names_visitor,
    lastname_visitor,
    photo_visitor,
    type_id_visitor,
    number_id_visitor,
    email_visitor,
    phone_visitor,
    company_where_visitor,
    things,
    eps,
    position,
  });

  await visitor.save();
  res.json({ visitor });
});

module.exports = {
  getVisitors,
  createVisitor
};

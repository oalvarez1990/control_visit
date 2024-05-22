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
    arl,
    position,
    status,
    description_rejection_visitor,
  } = req.body;

  // Validate
  const existingVisitor = await Visitors.findOne({ number_id_visitor });

  if (existingVisitor) {
    return res.status(400).json({
      error:
        "The visitor already exists with the provided identification number.",
    });
  }

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
    arl,
    position,
    status,
    description_rejection_visitor,
  });

  await visitor.save();
  res.json({ visitor });
});

//TODO: Get visitor by number_id_visitor
const getVisitor = catchError(async (req = request, res = response) => {
  const { number_id_visitor } = req.body;
  const visitor = await Visitors.findOne({ number_id_visitor });
  if (!visitor) {
    return res.status(404).json({ message: "The visitor is not registered" });
  }
  res.json({ visitor });
});

//TODO: Update visitor by number_id_visitor
const updateVisitor = catchError(async (req = request, res = response) => {
  const { number_id_visitor } = req.body;
  const visitor = await Visitors.findOne({ number_id_visitor });
  if (!visitor) {
    return res.status(404).json({ message: "The visitor is not registered" });
  }

  const {
    names_visitor,
    lastname_visitor,
    photo_visitor,
    type_id_visitor,
    email_visitor,
    phone_visitor,
    company_where_visitor,
    things,
    eps,
    arl,
    position,
    status,
    description_rejection_visitor,
  } = req.body;

  visitor.names_visitor = names_visitor || visitor.names_visitor;
  visitor.lastname_visitor = lastname_visitor || visitor.lastname_visitor;
  visitor.photo_visitor = photo_visitor || visitor.photo_visitor;
  visitor.type_id_visitor = type_id_visitor || visitor.type_id_visitor;
  visitor.email_visitor = email_visitor || visitor.email_visitor;
  visitor.phone_visitor = phone_visitor || visitor.phone_visitor;
  visitor.company_where_visitor =
    company_where_visitor || visitor.company_where_visitor;
  visitor.things = things || visitor.things;
  visitor.eps = eps || visitor.eps;
  visitor.arl = arl || visitor.arl;
  visitor.position = position || visitor.position;
  visitor.status = status || visitor.status;
  visitor.description_rejection_visitor =
    description_rejection_visitor || visitor.description_rejection_visitor;

  await visitor.save();
  res.json({ visitor });
});

module.exports = {
  getVisitors,
  createVisitor,
  getVisitor,
  updateVisitor,
};

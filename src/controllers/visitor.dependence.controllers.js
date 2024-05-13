const VisitorDependences = require("../models/visitors_dependences");
const Visitor = require("../models/visitors");
const Employees = require("../models/employees");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

//TODO: Get all visit and dependence
const getVisits = catchError(async (req = request, res = response) => {
  const visits = await VisitorDependences.find().populate("visitor");

  res.json({ visits });
});
//TODO: Get visitor type_id_visitor,number_id_visitor,dependence,date_in,hour_in,date_out,hour_out,names_employee
const getVisitorDetails = catchError(async (req = request, res = response) => {
  const { type_id_visitor, number_id_visitor } = req.query;

  try {
    // TODO: Search visit for id
    const visitor = await Visitor.findOne({
      type_id_visitor,
      number_id_visitor,
    });

    if (!visitor) {
      return res.status(404).json({ error: "The visitor was not found." });
    }

    // TODO: Search visit for visitor
    const visitsDetails = await VisitorDependences.find({
      visitor: visitor._id,
    })
      .populate("dependence", "name_dependence") 
      .populate("visitor", "names_visitor") 
      .populate({
        path: "employees", //
        populate: {
          path: "employee_id",
          model: "employees",
          select: "names_employee",
        },
      })
      .select("date_in hour_in date_out hour_out");

    return res.status(200).json(visitsDetails);
  } catch (error) {
    console.error("Error getting visitor details:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

//TODO: registerVisit visitor in dependence
const registerVisit = catchError(async (req = request, res = response) => {
  const {
    date_in,
    hour_in,
    date_out,
    hour_out,
    dependence,
    type_id_visitor,
    number_id_visitor,
  } = req.body;

  try {
    //TODO:Validate if id visitor does not exist
    const visitor = await Visitor.findOne({ number_id_visitor });

    if (!visitor) {
      return res.status(400).json({
        error: "The visitor with this ID number does not exist o not register.",
      });
    }

    //TODO:Check if there is already a visit
    const existingVisit = await VisitorDependences.findOne({
      visitor: visitor._id,
      dependence,
      date_out: null,
    });

    if (existingVisit) {
      return res.status(400).json({
        error: "The visitor already has a visit in progress for this unit.",
      });
    }
    //TODO: Date and hour of system
    const currentDate = new Date();
    // TODO: // Get date format YYYY-MM-DD
    const date_in = currentDate.toISOString().split("T")[0];
    //TODO: Get hour in format HH:MM:SS
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const hour_in = `${hours}:${minutes}:${seconds}`;

    //TODO: Register new visit
    const newVisit = new VisitorDependences({
      date_in,
      hour_in,
      date_out,
      hour_out,
      dependence,
      visitor: visitor._id,
    });

    await newVisit.save();

    // TODO: Return a success response
    return res.status(201).json({ message: "Visit successfully registered." });
  } catch (error) {
    console.error("Error when registering the visit:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

// TODO: registerVisitOut in dependence
const registerVisitOut = catchError(async (req = request, res = response) => {
  const { number_id_visitor } = req.body;

  try {
    // TODO: Validate if the visitor's identification number exists
    const visitor = await Visitor.findOne({ number_id_visitor });
    if (!visitor) {
      return res.status(400).json({
        error:
          "The visitor with this ID number does not exist or is not registered.",
      });
    }

    // TODO: Search if there is a visit in progress for the visitor
    const currentVisit = await VisitorDependences.findOne({
      visitor: visitor._id,
      date_out: null,
      hour_out: null,
    });

    if (!currentVisit) {
      return res
        .status(400)
        .json({ error: "The visitor does not have a visit in progress." });
    }

    //TODO:Get date and hour out system
    const currentDate = new Date();
    //TODO: Get date in format YYYY-MM-DD
    const date_out = currentDate.toISOString().split("T")[0];

    // TODO: Get hour in format HH:MM:SS
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const hour_out = `${hours}:${minutes}:${seconds}`;

    // TODO: Update the date and hour
    currentVisit.date_out = date_out;
    currentVisit.hour_out = hour_out;
    await currentVisit.save();

    return res
      .status(200)
      .json({ message: "Visitor exit successfully recorded." });
  } catch (error) {
    console.error("Error checking out visitor:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});
//TODO: reschedule appointment

module.exports = {
  registerVisit,
  getVisits,
  registerVisitOut,
  getVisitorDetails,
};

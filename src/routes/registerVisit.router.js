const {
  registerVisit,
  getVisits,
  registerVisitOut,
  getVisitorDetails,
} = require("../controllers/visitor.dependence.controllers");
const express = require("express");
//
const registerVisitRouter = express.Router();
//routes
registerVisitRouter.get("/", getVisits);
registerVisitRouter.post("/", registerVisit);
registerVisitRouter.put("/:id", registerVisitOut);
registerVisitRouter.get("/details", getVisitorDetails);

module.exports = registerVisitRouter;

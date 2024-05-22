const companyRouter = require("./company.router");
const dependenceRouter = require("./dependence.router");
const employeeRouter = require("./employee.router");
const epsRouter = require("./eps.router");
const thingRouter = require("./thing.router");
const positionRouter = require("./position.router");
const visitorRouter = require("./visitors.router");
const registerVisitRouter = require("./registerVisit.router");
const arlRouter = require("./arl.router");
const statusRouter = require('./status.router')
const express = require("express");
const router = express.Router();

// colocar las rutas aquí
router.use("/company", companyRouter);
router.use("/dependence", dependenceRouter);
router.use("/employee", employeeRouter);
router.use("/eps", epsRouter);
router.use("/thing", thingRouter);
router.use("/position", positionRouter);
router.use("/visitor", visitorRouter);
router.use("/registerVisit", registerVisitRouter);
router.use("/arl", arlRouter);
router.use("/status", statusRouter);

module.exports = router;

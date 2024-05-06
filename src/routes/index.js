const companyRouter = require("./company.router");
const dependenceRouter = require("./dependence.router");
const employeeRouter = require("./employee.router");
const express = require('express');
const router = express.Router();


// colocar las rutas aquí
router.use('/company' , companyRouter); 
router.use('/dependence' , dependenceRouter);
router.use('/employee' , employeeRouter);

module.exports = router;

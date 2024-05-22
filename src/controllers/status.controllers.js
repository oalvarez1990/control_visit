const Status = require("../models/status");
const { request, response } = require("express");
const catchError = require("../utils/catchError");

const getStatus = catchError(async (request, response) => {
  const status = await Status.find();
  response.status(200).json({
    status,
  });
});

//CreatedStatus
const createStatus = catchError(async (request, response) => {
  const { code_status, name_status } = request.body;
  //Validate status not duplicate
  const statusDuplicate = await Status.findOne({ code_status });
  if (statusDuplicate) {
    return response.status(400).json({
      message: "Status already exists",
    });
  }
  const status = new Status({ code_status, name_status });
  await status.save();
  response.status(201).json({
    status,
  });
});

//exports
module.exports = {
  getStatus,
  createStatus,
};

const {
  getArl,
  createArl,
  updateArl,
  deleteArl,
} = require("../controllers/arl.controllers");
const express = require("express");
//
const arlRouter = express.Router();
//routes
arlRouter.route("/").get(getArl);
arlRouter.route("/").post(createArl);
arlRouter.route("/:id").put(updateArl);
arlRouter.route("/:id").delete(deleteArl);
module.exports = arlRouter;

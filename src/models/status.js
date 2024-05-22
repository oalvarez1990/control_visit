const { Schema, model } = require("mongoose");

const statusSchema = new Schema({
  code_status: {
    type: String,
    required: [true, "The code is required"],
    trim: true,
  },
  name_status: {
    type: String,
    required: [true, "The name is required"],
    trim: true,
  },
});

const Status = model("Status", statusSchema);
module.exports = Status;

const { Schema, model } = require("mongoose");

const positionSchema = new Schema({
  code_position: {
    type: String,
    required: [true, "The code is required"],
    trim: true,
  },
  name_position: {
    type: String,
    required: [true, "The name is required"],
    trim: true,
  },
});

const Position = model("Position", positionSchema);
module.exports = Position;

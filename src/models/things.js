const { Schema, model } = require("mongoose");

const thingSchema = new Schema({
  name_thing: {
    type: String,
    required: [true, "The name is required"],
    trim: true,
  },
  serial: {
    type: String,
    required: [true, "The serial is required"],
    trim: true,
  },
});

const Thing = model("Thing", thingSchema);
module.exports = Thing;

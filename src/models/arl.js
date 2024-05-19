const { Schema, model, default: mongoose } = require("mongoose");

const arlSchema = new Schema({
  code_arl: {
    type: String,
    required: [true, "Code is required"],
  },
  name_arl: {
    type: String,
    required: [true, "Name is required"],
  },
});

const ARL = mongoose.model("ARL", arlSchema);
module.exports = ARL;

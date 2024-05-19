const { Schema, model, default: mongoose } = require("mongoose");

const visitorDependencesSchema = new Schema({
  date_in: {
    type: Date,
    required: [false, "Check-in date is mandatory"],
  },
  hour_in: {
    type: String,
    required: [false, "Check-in time is mandatory"],
  },
  date_out: {
    type: Date,
    required: [false, "Departure date is mandatory."],
  },
  hour_out: {
    type: String,
    required: [false, "Departure time is mandatory."],
  },
  dependence: {
    type: Schema.Types.ObjectId,
    ref: "Dependence",
    required: true,
  },
  visitor: {
    type: Schema.Types.ObjectId,
    ref: "Visitor",
    required: true,
  },

});

const VisitorDependences = mongoose.model(
  "VisitorDependences",
  visitorDependencesSchema
);

module.exports = VisitorDependences;

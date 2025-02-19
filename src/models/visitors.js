const { Schema, model, default: mongoose } = require("mongoose");

const visitorSchema = new Schema({
  names_visitor: {
    type: String,
    required: [true, "Visitor names are required."],
    trim: true,
  },
  lastname_visitor: {
    type: String,
    required: [true, "Visitor last names are required."],
    trim: true,
  },
  photo_visitor: {
    type: String,
  },
  type_id_visitor: {
    type: String,
    required: [true, "Visitor ID type is required."],
    validator: (value) => ["CC", "CE", "NIT"].includes(value),
    message: (props) => `${props.value} is not a valid document type`,
  },

  number_id_visitor: {
    type: String,
    required: [true, " Visitor ID number is required."],
    unique: true,
  },
  email_visitor: {
    type: String,
    required: [true, "Visitor email is required."],
    unique: true,
    lowercase: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please fill a valid email address.",
    ],
  },
  phone_visitor: {
    type: String,
    required: [true, "Visitor phone number is required."],
    minlength: [7, " The phone number must not be less than 7 digits."],
    maxlength: [10, "The phone number must not be less than 10 digits."],
  },
  company_where_visitor: {
    type: String,
    required: [true, " Visitor company is required."],
  },
  description_rejection_visitor: {
    type: String,
  },

  things: {
    type: Schema.Types.ObjectId,
    ref: "Things",
    required: true,
  },
  eps: {
    type: Schema.Types.ObjectId,
    ref: "Eps",
    required: true,
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  arl: {
    type: Schema.Types.ObjectId,
    ref: "Arl",
    required: true,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
});

const Visitor = model("Visitor", visitorSchema);
module.exports = Visitor;

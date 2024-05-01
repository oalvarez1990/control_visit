const { minLength } = require("class-validator");
const { Schema, model, default: mongoose } = require("mongoose");

const companySchema = new Schema({
  type_id_company: {
    type: String,
    required: [true, "Document type is required"],
    validate: {
      validator: (value) => ["CC", "CE", "NIT"].includes(value),
      message: (props) => `${props.value} is not a valid document type`,
    },
  },
  number_id_company: {
    type: String,
    required: [true, "Document number is required"],
  },
  name_company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  email_company: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Company email is required"],
    validate: {
      validator: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  phone_number_company: {
    type: String,
    required: [true, "Company phone number is required"],
    minLength: [7, "Phone number must be at least 7 characters"],
    maxLength: [10, "Phone number must be at most 10 characters"],
  },
  address_company: {
    type: String,
    required: [true, "Company address is required"],
  },
  city_company: {
    type: String,
    required: [true, "Company city is required"],
  },
});
companySchema.virtual("fullName").get(function () {
  return `${this.type_id_company} ${this.number_id_company} ${this.name_company}`;
});

companySchema.pre("save", function (next) {
  this.name_company = this.name_company.toUpperCase();
  next();
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

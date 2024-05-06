const { Schema, model, default: mongoose } = require("mongoose");

const employeeSchema = new Schema({
  names_employee: {
    type: String,
    required: [true, "The name is required"],
    trim: true,
  },

  lastaname_employee: {
    type: String,
    required: [true, "The lastname is required"],
    trim: true,
  },

  email_employee: {
    type: String,
    required: [true, "Employee email is required"],
    validate: {
      validator: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  phone_employee: {
    type: String,
    required: [true, "Employee phone number is required"],
    minLength: [7, "Phone number must be at least 7 characters"],
    maxLength: [10, "Phone number must be at most 10 characters"],
  },
  extension_employee: {
    type: String,
    required: [false, "Employee extension is required"],
    minLength: [1, "Extension must be at least 1 characters"],
    maxLength: [4, "Extension must be at most 4 characters"],
  },
  dependence: {
    type: Schema.Types.ObjectId,
    ref: "Dependence",
    required: [true, " The dependence is required employee"],
  },
});

employeeSchema.virtual("fullName").get(function () {
  return `${this.names_employee} ${this.lastaname_employee}`;
});

employeeSchema.pre("save", function (next) {
  this.names_employee = this.names_employee.toUpperCase();
  this.lastaname_employee = this.lastaname_employee.toUpperCase();
  next();
});

const Employee = model("Employee", employeeSchema);
module.exports = Employee;

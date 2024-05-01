const {Schema, model, default: mongoose} = require("mongoose");

const epsSchema = new Schema({
    //code_eps
    code_eps: {
        type: String,
        required: [true, "The code is required"],
        trim: true,
    },
    name_eps: {
        type: String,
        required: [true, "The name is required"],
        trim: true,
    },
});

const Eps = model("Eps", epsSchema);
module.exports = Eps;
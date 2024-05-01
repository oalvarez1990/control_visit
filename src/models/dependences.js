const {Schema, model, default: mongoose} = require("mongoose");

const dependenceSchema = new Schema({
    code_dependence: {
        type: String,
        required: [true, "Dependence code is required"],
        unique: true,
    },
    name_dependence: {
        type: String,
        required: [true, "Dependence name is required"],
        trim: true,
    },
    id_company: {
        type: Schema.Types.ObjectId, 
        ref: 'Company',
        required: [true, "The company id is required"],
    },
});

const Dependence = mongoose.model("Dependence", dependenceSchema);
module.exports = Dependence;
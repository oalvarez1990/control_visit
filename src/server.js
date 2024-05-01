const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./utils/connection");
require("dotenv").config();
connectDB(process.env);
connectDB();

// Mongo DB connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const PORT = process.env.PORT;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);

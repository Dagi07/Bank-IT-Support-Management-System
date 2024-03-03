const connectDB = require("../config/dbConn");
const mongoose = require("mongoose");

connectDB();

const branchsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Branch = mongoose.model("Branch", branchsSchema);
module.exports = Branch;

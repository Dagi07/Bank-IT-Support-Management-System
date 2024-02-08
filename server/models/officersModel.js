const mongoose = require("mongoose");

const officersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneno: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    onLeave: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "IT Officer",
    },
  },
  { timestamps: true }
);

const Officer = mongoose.model("Officer", officersSchema);
module.exports = Officer;

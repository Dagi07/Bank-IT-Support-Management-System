const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    requestAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Officer",
    },
    isFixed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestsSchema);

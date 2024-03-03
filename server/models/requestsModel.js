const connectDB = require("../config/dbConn");
const mongoose = require("mongoose");

connectDB();

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
    requesterBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    requestAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Officer",
    },
    requestAssigneeUpdatedAt: {
      type: Date,
    },
    isDone: {
      type: Boolean,
    },
    isDoneUpdatedAt: {
      type: Date,
    },
    isFixed: {
      type: Boolean,
    },
    isFixedUpdatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

requestsSchema.pre("findOneAndUpdate", function (next) {
  const updateFields = {};

  if (this._update.requestAssignee) {
    updateFields.requestAssigneeUpdatedAt = new Date();
  }

  if (this._update.isDone) {
    updateFields.isDoneUpdatedAt = new Date();
  }

  if (this._update.isFixed) {
    updateFields.isFixedUpdatedAt = new Date();
  }

  this.set(updateFields);
  next();
});

module.exports = mongoose.model("Request", requestsSchema);

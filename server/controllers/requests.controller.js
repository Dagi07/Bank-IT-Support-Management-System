const Request = require("../models/requestsModel");
const { validateAddReqBody } = require("../utils/validation");

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find().lean();
    res.status(200).json({
      status: "success",
      data: requests,
    });
  } catch (error) {
    console.log(error);
  }
};
// findById(
//   "65c15ce484aca021d703fa04",
//   "-_id requestAssignee"
// ).lean();
// console.log(Object.keys(requests).length === 0);

const addRequest = async (req, res) => {
  try {
    const addReqBody = req.body;
    console.log();
    validateAddReqBody(addReqBody);
    if (validateAddReqBody(addReqBody)) {
      res.status(400).json({
        message: validateAddReqBody(addReqBody),
      });
      return;
    }

    const result = await Request.create({
      issue: addReqBody.issue,
      fullName: addReqBody.fullName,
    });

    result &&
      res.status(201).json({
        status: "success",
        message: "Request added",
        data: result,
      });
  } catch (error) {
    console.log(error);
  }
};

const updateRequest = async (req, res) => {
  try {
    const updateReqBody = req.body;
    const key = Object.keys(updateReqBody)[0];
    const value = updateReqBody[Object.keys(updateReqBody)[0]];

    const check = await Request.findById(req.params.id).lean();

    if (!Object.keys(check).includes(key)) {
      return res.status(400).json({
        status: "failure",
        message: "Bad request",
      });
    }

    const result = await Request.findByIdAndUpdate(
      req.params.id,
      {
        [key]: value,
      },
      { new: true }
    );

    let message = "";
    if (key === "isDone") {
      message = value
        ? "IT Officer marked request as fixed"
        : "IT Officer marked request as not fixed";
    } else if (key === "isFixed") {
      message = value
        ? "Requester confirmed request as fixed"
        : "Requester confirmed request as not fixed";
    }
    result
      ? res.status(202).json({
          status: "success",
          message,
          data: result,
        })
      : res.status(400).json({
          status: "failure",
        });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failure",
      message: "Bad request",
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const check = await Request.findById(req.params.id);
    if (!check) {
      return res.status(400).json({
        status: "failure",
        message: "Request not found",
      });
    }

    const result = await Request.findByIdAndDelete(req.params.id);
    result &&
      res.status(202).json({
        status: "success",
        message: `Request has been deleted`,
        data: result,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = { getRequests, addRequest, updateRequest, deleteRequest };

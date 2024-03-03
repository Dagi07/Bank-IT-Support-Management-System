const Request = require("../models/requestsModel");
const Branch = require("../models/branchsModel");
const Officer = require("../models/officersModel");

const { validateAddReqBody } = require("../utils/validation");
const dayjs = require("dayjs");
const mongoose = require("mongoose");

const getRequests = async (req, res) => {
  try {
    const requesterid = req.requesterID;

    if (req.role && req.role == "Manager") {
      let aggregationPipeline = [
        {
          $match: {
            $or: [{ isFixed: { $exists: false } }, { isFixed: false }],
          },
        },
        {
          $lookup: {
            from: "branches", // The name of the Branch collection
            localField: "requesterBranch",
            foreignField: "_id",
            as: "branch",
          },
        },
        {
          $unwind: {
            path: "$branch",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            username: "$branch.username",
            city: "$branch.city",
            name: "$branch.name",
            phoneno: "$branch.phoneno",
          },
        },
        {
          $project: {
            _id: 1,
            // Include other fields you need
            // If there are conflicts, you can use aliases, like 'requestField' and 'branchField'
            // For example: requestField: '$fieldInRequest', branchField: '$branch.fieldInBranch'
            "branch.password": 0, // Exclude 'password' field from 'branch'
            "branch._id": 0,
            "branch.createdAt": 0,
            "branch.updatedAt": 0,
            "branch.__v": 0,
            "branch.isActive": 0,
          },
        },
      ];

      const requests = await Request.aggregate(aggregationPipeline);
      // console.log(requests);
      if (requests) {
        res.status(200).json({
          status: "success",
          data: requests,
        });
      } else {
        return res.status(400).json({
          status: "failure",
          message: "Bad request",
        });
      }
    } else if (req.role && req.role == "IT Officer" && requesterid) {
      // const requests = await Request.find({
      //   requestAssignee: requesterid,
      //   $or: [{ isFixed: { $exists: false } }, { isFixed: false }],
      // }).lean();

      // for (const request of requests) {
      //   // Fetch related Branch document based on requesterBranch
      //   const branch = await Branch.findById(
      //     request.requesterBranch,
      //     "-password -_id -createdAt -updatedAt -__v -isActive"
      //   ).lean();
      //   // console.log(branch);
      //   Object.assign(request, branch);
      // }

      const objectId = mongoose.Types.ObjectId.isValid(requesterid)
        ? new mongoose.Types.ObjectId(requesterid)
        : requesterid;

      let aggregationPipeline = [
        {
          $match: {
            $and: [
              {
                $or: [{ isFixed: { $exists: false } }, { isFixed: false }],
              },
              {
                $or: [
                  { requestAssignee: objectId },
                  { requestAssignee: requesterid },
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "branches",
            let: {
              requesterBranchObjectId: { $toObjectId: "$requesterBranch" },
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ["$_id", "$$requesterBranchObjectId"] }, // ObjectId case
                      { $eq: ["$_id", "$requesterBranch"] }, // String case
                    ],
                  },
                },
              },
            ],
            as: "branch",
          },
        },
        {
          $unwind: {
            path: "$branch",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            name: "$branch.name",
          },
        },
        {
          $project: {
            _id: 1,
            branch: 0,
          },
        },
      ];

      const requests = await Request.aggregate(aggregationPipeline);

      if (requests) {
        res.status(200).json({
          status: "success",
          data: requests,
        });
      } else {
        return res.status(400).json({
          status: "failure",
          message: "Bad request",
        });
      }
    } else {
      // const requests = await Request.find({
      //   requesterBranch: requesterid,
      //   $or: [{ isFixed: { $exists: false } }, { isFixed: false }],
      // }).lean();
      const objectId = mongoose.Types.ObjectId.isValid(requesterid)
        ? new mongoose.Types.ObjectId(requesterid)
        : requesterid;
      let aggregationPipeline = [
        {
          $match: {
            $and: [
              {
                $or: [{ isFixed: { $exists: false } }, { isFixed: false }],
              },
              {
                $or: [
                  { requesterBranch: objectId },
                  { requesterBranch: requesterid },
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "officers",
            let: {
              requestAssigneeObjectId: { $toObjectId: "$requestAssignee" },
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ["$_id", "$$requestAssigneeObjectId"] }, // ObjectId case
                      { $eq: ["$_id", "$requestAssignee"] }, // String case
                    ],
                  },
                },
              },
            ],
            as: "officer",
          },
        },
        {
          $unwind: {
            path: "$officer",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            firstName: "$officer.firstName",
            lastName: "$officer.lastName",
            // Include other officer fields as needed
          },
        },
        {
          $project: {
            _id: 1,
            // Include other fields you need
            // If there are conflicts, you can use aliases, like 'requestField' and 'officerField'
            // For example: requestField: '$fieldInRequest', officerField: '$officer.fieldInofficer'
            officer: 0, // Exclude the nested 'officer' field
          },
        },
      ];
      const requests = await Request.aggregate(aggregationPipeline);

      // console.log("req cntrl", requests);
      if (requests) {
        // console.log(requests);
        res.status(200).json({
          status: "success",
          data: requests,
        });
      } else {
        return res.status(400).json({
          status: "failure",
          message: "Bad request",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
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

    validateAddReqBody(addReqBody);
    if (validateAddReqBody(addReqBody)) {
      res.status(400).json({
        message: validateAddReqBody(addReqBody),
      });
      return;
    }
    const id = req.requesterID;
    const result = await Request.create({
      issue: addReqBody.issue,
      fullName: addReqBody.fullName,
      requesterBranch: id,
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

    if (Object.keys(check).includes(key)) {
      if (key == "requestAssignee") {
        const lastEditedTime = check.requestAssigneeUpdatedAt;
        const difference = dayjs().diff(lastEditedTime, "minute");
        if (difference > 30) {
          return res.status(403).json({
            status: "failure",
            message:
              "The assigned IT officer cannot be changed after 30 minutes of the modification.",
          });
        }
      } else if (key == "isDone" && value == false) {
        const lastEditedTime = check.isDoneUpdatedAt;
        const difference = dayjs().diff(lastEditedTime, "minute");
        if (difference > 45) {
          return res.status(403).json({
            status: "failure",
            message:
              "You cannot mark the request as 'Not Resolved' after 45 minutes of marking it as 'Resolved'.",
          });
        }
      } else if (key == "isFixed" && value == false) {
        const lastEditedTime = check.isFixedUpdatedAt;
        const difference = dayjs().diff(lastEditedTime, "minute");
        if (difference > 60) {
          return res.status(403).json({
            status: "failure",
            message:
              "You cannot mark the request as 'Not Fixed' after 1 hour of marking it as 'Fixed'!",
          });
        }
      }
    }

    let result = await Request.findByIdAndUpdate(
      req.params.id,
      {
        [key]: value,
      },
      { new: true }
    );

    if (!result) {
      console.error("Document not found:", req.params.id);
      return res.status(404).json({
        status: "failure",
        message: "Document not found",
      });
    }

    let message = "";
    if (key === "isDone") {
      message = value
        ? "IT Officer marked request as fixed"
        : "IT Officer marked request as not fixed";
    } else if (key === "isFixed") {
      message = value
        ? "Requester confirmed request as fixed"
        : "Requester confirmed request as not fixed";
    } else if (key === "requestAssignee") {
      message = value && `Request Assignee has been changed to ${value}`;
    }

    const branch = await Branch.findById(
      result.requesterBranch,
      "-password -_id -createdAt -updatedAt -__v -isActive"
    )
      .lean()
      .exec();

    if (!branch) {
      console.error("Related Branch not found:", result.requesterBranch);
      return res.status(404).json({
        status: "failure",
        message: "Related Branch not found",
      });
    }

    // console.log("Result before merging:", result);
    // console.log("Branch:", branch);
    result = result.toObject();
    Object.assign(result, branch);

    // console.log("Result after merging:", result);

    res.status(200).json({
      status: "success",
      message,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failure",
      message: "Bad request",
      data: error,
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

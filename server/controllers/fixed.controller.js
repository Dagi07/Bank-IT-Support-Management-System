const Request = require("../models/requestsModel");
const Branch = require("../models/branchsModel");
const Officer = require("../models/officersModel");
const mongoose = require("mongoose");

const getFixed = async (req, res) => {
  try {
    const requesterid = req.requesterID;
    // console.log(requesterid);
    if (req.role && req.role == "Manager") {
      // const requests = await Request.find({ isFixed: true }).lean();

      // for (const request of requests) {
      //   const branch = await Branch.findById(
      //     request.requesterBranch,
      //     "-password -_id -createdAt -updatedAt -__v -isActive"
      //   ).lean();
      //   Object.assign(request, branch);
      // }
      // for (const request of requests) {
      //   const officer = await Officer.findById(
      //     request.requestAssignee,
      //     "-password -_id -createdAt -updatedAt -__v -isActive"
      //   ).lean();
      //   Object.assign(request, officer);
      // }

      let aggregationPipeline = [
        {
          $match: {
            isFixed: true,
          },
        },
        {
          $addFields: {
            requesterBranchObjectId: {
              $cond: {
                if: { $eq: [{ $type: "$requesterBranch" }, "objectId"] },
                then: "$requesterBranch",
                else: { $toObjectId: "$requesterBranch" },
              },
            },
          },
        },
        {
          $addFields: {
            requestAssigneeObjectId: {
              $cond: {
                if: { $eq: [{ $type: "$requestAssignee" }, "objectId"] },
                then: "$requestAssignee",
                else: { $toObjectId: "$requestAssignee" },
              },
            },
          },
        },
        {
          $lookup: {
            from: "branches",
            localField: "requesterBranchObjectId",
            foreignField: "_id",
            as: "branch",
          },
        },
        {
          $lookup: {
            from: "officers",
            localField: "requestAssigneeObjectId",
            foreignField: "_id",
            as: "officer",
          },
        },
        {
          $unwind: {
            path: "$branch",
            preserveNullAndEmptyArrays: true,
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
            username: "$branch.username",
            city: "$branch.city",
            name: "$branch.name",
            phoneno: "$branch.phoneno",
          },
        },
        {
          $addFields: {
            firstName: "$officer.firstName",
            lastName: "$officer.lastName",
          },
        },
        {
          $project: {
            _id: 1,
            branch: 0,
            officer: 0,
          },
        },
      ];

      const requests = await Request.aggregate(aggregationPipeline);

      // console.log("fixed manager", requests);
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
      const objectId = mongoose.Types.ObjectId.isValid(requesterid)
        ? new mongoose.Types.ObjectId(requesterid)
        : requesterid;

      let aggregationPipeline = [
        {
          $match: {
            $or: [
              { requestAssignee: objectId, isFixed: true },
              { requestAssignee: requesterid, isFixed: true },
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
      //   isFixed: true,
      // }).lean();

      const objectId = mongoose.Types.ObjectId.isValid(requesterid)
        ? new mongoose.Types.ObjectId(requesterid)
        : requesterid;

      let aggregationPipeline = [
        {
          $match: {
            $or: [
              { requesterBranch: objectId, isFixed: true },
              { requesterBranch: requesterid, isFixed: true },
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
          },
        },
        {
          $project: {
            _id: 1,
            officer: 0,
          },
        },
      ];

      const requests = await Request.aggregate(aggregationPipeline);

      if (requests) {
        // console.log("branch fixed", requests);
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

// const updateFixed = async (req, res) => {
//   try {
//     const updateReqBody = req.body;

//     const result = await Request.findByIdAndUpdate(
//       req.params.id,
//       updateReqBody,
//       { new: true }
//     );

//     result
//       ? res.status(202).json({
//           status: "success",
//           message: "Requester confirmed request as not fixed",
//           data: result,
//         })
//       : res.status(400).json({
//           status: "failure",
//         });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "failure",
//       message: "Bad request",
//     });
//   }
// };

module.exports = { getFixed };

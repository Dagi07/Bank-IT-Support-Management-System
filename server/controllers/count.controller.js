const Request = require("../models/requestsModel");

const requestsMade = async (req, res) => {
  //   console.log(req.params.id);
  try {
    const requestsMadeId = req.params.id;
    console.log(requestsMadeId);
    const branchId = mongoose.Types.ObjectId(requestsMadeId);
    const aggregationPipeline = [
      {
        $match: {
          requesterBranch: branchId,
        },
      },
      {
        $count: "requestCount",
      },
    ];

    const requestCountResult = await Request.aggregate(aggregationPipeline);

    // The result will be an array containing an object with the count
    const requestCount =
      requestCountResult.length > 0 ? requestCountResult[0].requestCount : 0;

    console.log(`Number of requests made by the branch: ${requestCount}`);
  } catch (error) {}
};

module.exports = { requestsMade };

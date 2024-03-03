const jwt = require("jsonwebtoken");
const Officer = require("../models/officersModel");

const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send({
      status: "fail",
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.SECRET_JWT_CODE, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: "fail",
        message: "Unauthenticated!",
      });
    }
    // console.log("Here is the decoded token");
    // console.log(decoded);
    req.requesterID = decoded.id;
    decoded.role && (req.role = decoded.role);
    decoded.email && (req.email = decoded.email);
    next();
  });
};

const isOfficerOrManager = async (req, res, next) => {
  // let token = req.headers["x-access-token"];
  console.log(req.email);
  const offEmail = req.email;
  const officer = await Officer.findOne({ email: offEmail });
  if (officer.role == "IT Officer" || officer.role == "Manager") {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      error: "Not an Officer or Manager!",
    });
  }
};

const isManager = async (req, res, next) => {
  // let token = req.headers["x-access-token"];
  console.log(req.email);
  const manEmail = req.email;
  const manager = await Officer.findOne({ email: manEmail });
  if (manager.role == "Manager") {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      error: "Not a Manager!",
    });
  }
};

module.exports = { verifyToken, isOfficerOrManager, isManager };

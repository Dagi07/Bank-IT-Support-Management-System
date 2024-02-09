const Branch = require("../models/branchsModel");
const { validateAddBranchBody } = require("../utils/validation");
const bcrypt = require("bcrypt");

const addBranch = async (req, res) => {
  try {
    const addBranchData = req.body;
    validateAddBranchBody(addBranchData);
    if (validateAddBranchBody(addBranchData)) {
      console.log(validateAddBranchBody(addBranchData));
      res.status(400).json({
        message: validateAddBranchBody(addBranchData),
      });
      return;
    }

    const duplicateUsername = addBranchData.username;
    const duplicate = await Branch.findOne({
      username: duplicateUsername,
    });
    if (duplicate && duplicate?._id != req.params.id) {
      return res
        .status(409)
        .json({ status: "failure", message: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPswd = await bcrypt.hash(addBranchData.password, salt);

    const result = await Branch.create({
      username: addBranchData.username,
      city: addBranchData.city,
      name: addBranchData.name,
      phoneno: addBranchData.phoneno,
      password: hashedPswd,
    });

    const data = {
      username: result.username,
      city: result.city,
      name: result.name,
      phoneno: result.phoneno,
      _id: result._id,
      createdAt: result.createdAt,
    };

    result &&
      res.status(201).json({
        status: "success",
        message: "Branch has been added",
        data,
      });
  } catch (error) {
    console.log(error);
  }
};

const getBranchs = async (req, res) => {
  try {
    const result = await Branch.find({ isActive: true }, "-password");

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateBranch = async (req, res) => {
  try {
    const updateBranchData = req.body;
    validateAddBranchBody(updateBranchData);
    if (validateAddBranchBody(updateBranchData)) {
      res.status(400).json({
        status: "failure",
        message: validateAddBranchBody(updateBranchData),
      });
      return;
    }
    const check = await Branch.findById(req.params.id);
    if (!check) {
      return res.status(400).json({
        status: "failure",
        message: "Branch not found",
      });
    }

    const duplicateUsername = updateBranchData.username;
    const duplicate = await Branch.findOne({
      username: duplicateUsername,
    });
    if (duplicate && duplicate?._id != req.params.id) {
      return res
        .status(409)
        .json({ status: "failure", message: "Username already taken" });
    }

    const result = await Branch.findByIdAndUpdate(
      req.params.id,
      {
        username: updateBranchData.username,
        city: updateBranchData.city,
        name: updateBranchData.name,
        phoneno: updateBranchData.phoneno,
        password: updateBranchData.password,
      },
      { projection: { password: 0 }, new: true }
    );

    result &&
      res.status(202).json({
        status: "success",
        message: "Branch has been updated",
        data: result,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failure",
      message: "Bad request",
    });
  }
};

const passiveBranch = async (req, res) => {
  try {
    const check = await Branch.findById(req.params.id);
    if (!check) {
      return res.status(400).json({
        status: "failure",
        message: "Branch not found",
      });
    }

    const makePassive = await Branch.findById(req.params.id);
    makePassive.isActive
      ? await Branch.findByIdAndUpdate(
          req.params.id,
          { isActive: false },
          { projection: { password: 0 }, new: true }
        ).then((result) =>
          res.status(202).json({
            status: "success",
            message: `${result.name} Branch has been made Inactive`,
            data: result,
          })
        )
      : await Branch.findByIdAndUpdate(
          req.params.id,
          { isActive: true },
          { projection: { password: 0 }, new: true }
        ).then((result) =>
          res.status(202).json({
            status: "success",
            message: `${result.name} Branch has been made Active`,
            data: result,
          })
        );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getInactiveBranchs = async (req, res) => {
  try {
    const result = await Branch.find({ isActive: false }, "-password");

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addBranch,
  getBranchs,
  updateBranch,
  passiveBranch,
  getInactiveBranchs,
};

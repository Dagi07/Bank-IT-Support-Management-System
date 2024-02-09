const Officer = require("../models/officersModel");
const { validateAddOfficerBody } = require("../utils/validation");
const bcrypt = require("bcrypt");

const addOfficer = async (req, res) => {
  try {
    const addOfficerData = req.body;
    validateAddOfficerBody(addOfficerData);
    if (validateAddOfficerBody(addOfficerData)) {
      res.status(400).json({
        message: validateAddOfficerBody(addOfficerData),
      });
      return;
    }

    const duplicateEmail = addOfficerData.email;
    const duplicate = await Officer.findOne({
      email: duplicateEmail,
    });
    if (duplicate && duplicate?._id != req.params.id) {
      return res.status(409).json({
        status: "failure",
        message: `${
          addOfficerData.role == "Manager" ? "IT Manager" : "IT Officer"
        } with this email address has already been registered`,
      });
    }

    if (addOfficerData.role === "Manager") {
      if (addOfficerData.uniquePasscode != 12345678) {
        return res.status(403).json({
          status: "failure",
          message: "Please enter the Unique Passcode to add another manager",
        });
      }
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPswd = await bcrypt.hash(addOfficerData.password, salt);

    const result = await Officer.create({
      firstName: addOfficerData.firstName,
      lastName: addOfficerData.lastName,
      email: addOfficerData.email,
      phoneno: addOfficerData.phoneno,
      password: hashedPswd,
      role: addOfficerData.role,
    });

    const data = {
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      phoneno: result.phoneno,
      role: result.role,
      _id: result._id,
      createdAt: result.createdAt,
    };
    result &&
      res.status(201).json({
        status: "success",
        message: `${result.role == "Manager" ? "IT Manager" : "IT Officer"} ${
          result.firstName
        } has been added`,
        data,
      });
  } catch (error) {
    console.log(error);
  }
};

const getOfficers = async (req, res) => {
  try {
    const result = await Officer.find({ isActive: true }, "-password");

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateOfficer = async (req, res) => {
  try {
    const updateOfficerData = req.body;
    validateAddOfficerBody(updateOfficerData);
    if (validateAddOfficerBody(updateOfficerData)) {
      res.status(400).json({
        status: "failure",
        message: validateAddOfficerBody(updateOfficerData),
      });
      return;
    }
    const check = await Officer.findById(req.params.id);
    if (!check) {
      return res.status(400).json({
        status: "failure",
        message: "IT Officer not found",
      });
    }

    const duplicateEmail = updateOfficerData.email;
    const duplicate = await Officer.findOne({
      email: duplicateEmail,
    });
    if (duplicate && duplicate?._id != req.params.id) {
      return res.status(409).json({
        status: "failure",
        message: "IT Officer with this email already exist",
      });
    }

    const result = await Officer.findByIdAndUpdate(
      req.params.id,
      {
        firstName: updateOfficerData.firstName,
        lastName: updateOfficerData.lastName,
        email: updateOfficerData.email,
        phoneno: updateOfficerData.phoneno,
        password: updateOfficerData.password,
      },
      { projection: { password: 0 }, new: true }
    );

    result &&
      res.status(202).json({
        status: "success",
        message: "IT Officer has been edited",
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

const passiveOfficer = async (req, res) => {
  try {
    const check = await Officer.findById(req.params.id);
    if (!check) {
      return res.status(400).json({
        status: "failure",
        message: "IT officer not found",
      });
    }

    const makePassive = await Officer.findById(req.params.id);

    if (makePassive.isActive) {
      await Officer.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { projection: { password: 0 }, new: true }
      ).then((result) =>
        res.status(202).json({
          status: "success",
          message: `IT Officer ${result.firstName} ${result.lastName} has been made Inactive`,
          data: result,
        })
      );
    } else {
      await Officer.findByIdAndUpdate(
        req.params.id,
        { isActive: true },
        { projection: { password: 0 }, new: true }
      ).then((result) =>
        res.status(202).json({
          status: "success",
          message: `IT Officer ${result.firstName} ${result.lastName} has been made Active`,
          data: result,
        })
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const getInactiveOfficers = async (req, res) => {
  try {
    const result = await Officer.find({ isActive: false }, "-password");

    result &&
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
  addOfficer,
  getOfficers,
  updateOfficer,
  passiveOfficer,
  getInactiveOfficers,
};

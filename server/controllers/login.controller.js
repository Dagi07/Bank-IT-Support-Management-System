const Officer = require("../models/officersModel");
const Branch = require("../models/branchsModel");
const { validateLogin } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretJWTcode = process.env.SECRET_JWT_CODE;

const login = async (req, res) => {
  try {
    const loginData = req.body;
    loginData.email && (loginData.username = loginData.email);
    validateLogin(loginData);
    if (validateLogin(loginData)) {
      console.log(validateLogin(loginData));
      return res.status(400).json({
        message: validateLogin(loginData),
      });
    }

    const officerResult = await Officer.findOne({ email: loginData.email });
    const branchResult = await Branch.findOne({ username: loginData.username });

    if (loginData.email && officerResult) {
      const pswdMatch = await bcrypt.compare(
        loginData.password,
        officerResult.password
      );
      if (pswdMatch) {
        const payload = {
          id: officerResult._id,
          firstName: officerResult.firstName,
          lastName: officerResult.lastName,
          email: officerResult.email,
          role: officerResult.role,
        };
        const token = jwt.sign(payload, secretJWTcode, { expiresIn: "15d" });
        return res.status(200).json({
          status: "success",
          message: `Welcome ${officerResult.firstName}`,
          data: token,
        });
      } else {
        return res
          .status(401)
          .json({ status: "failure", message: `Invalid email or password` });
      }
    } else if (!loginData.email && branchResult) {
      const pswdMatch = await bcrypt.compare(
        loginData.password,
        branchResult.password
      );
      console.log(branchResult);
      const payload = {
        id: branchResult._id,
        username: branchResult.username,
        name: branchResult.name,
      };
      const token = jwt.sign(payload, secretJWTcode, { expiresIn: "15d" });
      if (pswdMatch) {
        return res.status(200).json({
          status: "success",
          message: `Welcome ${branchResult.name}`,
          data: token,
        });
      } else {
        return res
          .status(401)
          .json({ status: "failure", message: `Invalid username or password` });
      }
    } else {
      return res
        .status(401)
        .json({ status: "failure", message: `Invalid username or password` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = { login };

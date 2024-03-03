const Officer = require("../models/officersModel");
const Branch = require("../models/branchsModel");
const { validateLogin } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretJWTcode = process.env.SECRET_JWT_CODE;

const login = async (req, res) => {
  // console.log(req.body);
  try {
    const loginData = req.body;
    loginData.username && (loginData.username = loginData.username);
    validateLogin(loginData);
    if (validateLogin(loginData)) {
      console.log(validateLogin(loginData));
      return res.status(400).json({
        message: validateLogin(loginData),
      });
    }

    console.log(loginData.username);

    const officerResult = await Officer.findOne({ email: loginData.username });
    const branchResult = await Branch.findOne({ username: loginData.username });

    if (loginData.username && officerResult) {
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
        console.log("here 1");
        return res
          .status(401)
          .json({ status: "failure", message: `Invalid email or password` });
      }
    } else if (loginData.username && branchResult) {
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
        console.log("here 2");
        return res
          .status(401)
          .json({ status: "failure", message: `Invalid username or password` });
      }
    } else {
      console.log("here 3");
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

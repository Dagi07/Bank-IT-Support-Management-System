const express = require("express");
const router = express.Router();
const countController = require("../controllers/count.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/count/requests-made/:id")
  .get(authMiddleware.verifyToken, countController.requestsMade);

module.exports = router;

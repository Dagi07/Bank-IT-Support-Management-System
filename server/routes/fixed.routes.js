const express = require("express");
const router = express.Router();
const fixedController = require("../controllers/fixed.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/manage-requests/fixed")
  .get(authMiddleware.verifyToken, fixedController.getFixed);
//   .post(authMiddleware.verifyToken, fixedController.addFixed);
// router
//   .route("/manage-requests/fixed/:id")
//   .put(authMiddleware.verifyToken, fixedController.updateFixed);
//   .delete(fixedController.deleteFixed);

module.exports = router;

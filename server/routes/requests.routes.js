const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requests.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/manage-requests")
  .get(authMiddleware.verifyToken, requestController.getRequests)
  .post(authMiddleware.verifyToken, requestController.addRequest);
router
  .route("/manage-requests/:id")
  .put(authMiddleware.verifyToken, requestController.updateRequest)
  .delete(requestController.deleteRequest);

module.exports = router;

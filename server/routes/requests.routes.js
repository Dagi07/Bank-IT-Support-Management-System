const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requests.controller");

router
  .route("/branch/request-support")
  .get(requestController.getRequests)
  .post(requestController.addRequest);
router
  .route("/branch/request-support/:id")
  .put(requestController.updateRequest)
  .delete(requestController.deleteRequest);

module.exports = router;

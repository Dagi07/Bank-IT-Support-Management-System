const express = require("express");
const router = express.Router();
const branchsController = require("../controllers/branchs.controller");

router
  .route("/manage-branchs")
  .post(branchsController.addBranch)
  .get(branchsController.getBranchs);
router
  .route("/manage-branchs/:id")
  .put(branchsController.updateBranch)
  .delete(branchsController.passiveBranch);
// .get(branchsController.getaBranch);
router
  .route("/manage-branchs/inactive")
  .get(branchsController.getInactiveBranchs);
module.exports = router;

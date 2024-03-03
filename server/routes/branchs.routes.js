const express = require("express");
const router = express.Router();
const branchsController = require("../controllers/branchs.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/manage-branchs")
  .post(branchsController.addBranch)
  .get(branchsController.getBranchs);
router
  .route("/manage-branchs/:id")
  .put(
    [authMiddleware.verifyToken, authMiddleware.isOfficerOrManager],
    branchsController.updateBranch
  )
  .delete(
    [authMiddleware.verifyToken, authMiddleware.isOfficerOrManager],
    branchsController.passiveBranch
  );
// .get(branchsController.getaBranch);
router
  .route("/manage-branchs/inactive")
  .get(
    [authMiddleware.verifyToken, authMiddleware.isOfficerOrManager],
    branchsController.getInactiveBranchs
  );
module.exports = router;

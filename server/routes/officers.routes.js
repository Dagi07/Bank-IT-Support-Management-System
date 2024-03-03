const express = require("express");
const router = express.Router();
const officersController = require("../controllers/officers.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/manage-officers")
  .post(
    [authMiddleware.verifyToken, authMiddleware.isManager],
    officersController.addOfficer
  )
  .get(
    [authMiddleware.verifyToken, authMiddleware.isManager],
    officersController.getOfficers
  );
router
  .route("/manage-officers/:id")
  // .get(officersController.getAnOfficer)
  .put(
    [authMiddleware.verifyToken, authMiddleware.isManager],
    officersController.updateOfficer
  )
  .delete(
    [authMiddleware.verifyToken, authMiddleware.isManager],
    officersController.passiveOfficer
  );
router
  .route("/manage-officers/inactive")
  .get(
    [authMiddleware.verifyToken, authMiddleware.isManager],
    officersController.getInactiveOfficers
  );

module.exports = router;

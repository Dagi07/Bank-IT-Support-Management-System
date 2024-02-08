const express = require("express");
const router = express.Router();
const officersController = require("../controllers/officers.controller");

router
  .route("/manager/officers")
  .post(officersController.addOfficer)
  .get(officersController.getOfficers);
router
  .route("/manager/officers/:id")
  // .get(officersController.getAnOfficer)
  .put(officersController.updateOfficer)
  .delete(officersController.passiveOfficer);
router
  .route("/manager/officers/inactive")
  .get(officersController.getInactiveOfficers);

module.exports = router;

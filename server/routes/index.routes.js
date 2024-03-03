const express = require("express");
const router = express.Router();

const requestsRoutes = require("./requests.routes");
const branchsRoutes = require("./branchs.routes");
const officersRoutes = require("./officers.routes");
const loginRoutes = require("./login.routes");
const fixedRoutes = require("./fixed.routes");
const countRoutes = require("./count.routes");

router.use(requestsRoutes);
router.use(branchsRoutes);
router.use(officersRoutes);
router.use(loginRoutes);
router.use(fixedRoutes);
router.use(countRoutes);

module.exports = router;

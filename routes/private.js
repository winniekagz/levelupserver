const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const { protect } = require("../commonmiddlewares/auth");
// jwt token  gen
router.route("/").get(protect, getPrivateRoute);

module.exports = router;
